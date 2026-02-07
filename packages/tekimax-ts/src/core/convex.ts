import { execSync } from 'child_process'

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ConvexManagerOptions {
    /** Convex team access token. Defaults to process.env.CONVEX_ACCESS_TOKEN */
    accessToken?: string
    /** Convex team ID. If omitted, auto-resolved from token via /token_details */
    teamId?: string | number
}

export interface ConvexProject {
    id: number
    name: string
    slug: string
    teamId: number
    createTime: number
}

export interface ConvexCreateProjectResult {
    projectId: number
    deploymentName: string
    deploymentUrl: string
}

export interface ConvexCreateProjectOptions {
    /** Deployment type. Default: 'prod' */
    deploymentType?: 'dev' | 'prod'
    /** Deployment region. Default: server-chosen. Use getRegions() to list valid IDs. */
    region?: string
}

export interface ConvexEnvVar {
    name: string
    value: string
}

export interface ConvexRegion {
    id: string
    name: string
}

export interface ConvexTokenDetails {
    type: string
    teamId: number
    name: string
    createTime: number
}

export interface ConvexDeployOptions {
    /** Path to the Convex project directory (where convex/ folder lives). */
    projectDir?: string
    /** Additional CLI flags for `npx convex deploy`. */
    flags?: string[]
}

export interface ConvexOpenAPISpecOptions {
    /** Path to the Convex project directory. Defaults to cwd. */
    projectDir?: string
    /** Output file path. Defaults to 'convex-spec.yaml'. */
    output?: string
    /** Additional CLI flags for `npx convex-helpers open-api-spec`. */
    flags?: string[]
}

// ─── Manager ────────────────────────────────────────────────────────────────

const MANAGEMENT_API = 'https://api.convex.dev/v1'

/**
 * Programmatic interface to the Convex Management API.
 *
 * Provision projects, push schemas, manage env vars, and deploy — all from code.
 *
 * @example
 * ```ts
 * import { ConvexManager } from 'tekimax-ts'
 *
 * const convex = new ConvexManager({
 *   accessToken: process.env.CONVEX_ACCESS_TOKEN,
 *   teamId: process.env.CONVEX_TEAM_ID,
 * })
 *
 * // Create a project
 * const project = await convex.createProject('my-ai-app')
 *
 * // Set env vars on the deployment
 * await convex.setEnvVars(project.deploymentName, [
 *   { name: 'OPENAI_API_KEY', value: 'sk-...' },
 * ])
 *
 * // Push schema & functions
 * const deployKey = await convex.createDeployKey(project.deploymentName)
 * await convex.deploy(deployKey, { projectDir: './my-convex-app' })
 * ```
 */
export class ConvexManager {
    private accessToken: string
    private teamId: string | number | undefined

    constructor(options: ConvexManagerOptions = {}) {
        this.accessToken = options.accessToken || process.env.CONVEX_ACCESS_TOKEN || ''
        this.teamId = options.teamId || process.env.CONVEX_TEAM_ID

        if (!this.accessToken) {
            throw new Error(
                'ConvexManager requires an access token. ' +
                'Pass accessToken in options or set CONVEX_ACCESS_TOKEN env var.'
            )
        }
    }

    // ─── Project Lifecycle ──────────────────────────────────────────────

    /**
     * Create a new Convex project (includes an initial deployment).
     */
    async createProject(
        name: string,
        options: ConvexCreateProjectOptions = {}
    ): Promise<ConvexCreateProjectResult> {
        const teamId = await this.resolveTeamId()
        const body: Record<string, any> = {
            projectName: name,
            deploymentType: options.deploymentType || 'prod',
        }
        if (options.region) {
            body.deploymentRegion = options.region
        }

        return this.request<ConvexCreateProjectResult>(
            `${MANAGEMENT_API}/teams/${teamId}/create_project`,
            { method: 'POST', body }
        )
    }

    /**
     * List all projects for the team.
     */
    async listProjects(): Promise<ConvexProject[]> {
        const teamId = await this.resolveTeamId()
        return this.request<ConvexProject[]>(
            `${MANAGEMENT_API}/teams/${teamId}/list_projects`
        )
    }

    /**
     * Delete a project by ID.
     */
    async deleteProject(projectId: number): Promise<void> {
        await this.request(
            `${MANAGEMENT_API}/projects/${projectId}`,
            { method: 'DELETE' }
        )
    }

    // ─── Deployment Management ──────────────────────────────────────────

    /**
     * Generate a deploy key for a deployment (needed for schema push / deploy).
     */
    async createDeployKey(deploymentName: string): Promise<string> {
        const result = await this.request<{ deployKey: string }>(
            `${MANAGEMENT_API}/deployments/${deploymentName}/create_deploy_key`,
            { method: 'POST', body: { name: 'sdk-provisioned' } }
        )
        return result.deployKey
    }

    /**
     * Set environment variables on a deployment (bulk upsert).
     */
    async setEnvVars(deploymentName: string, vars: ConvexEnvVar[]): Promise<void> {
        await this.request(
            `https://${deploymentName}.convex.cloud/api/v1/update_environment_variables`,
            {
                method: 'POST',
                body: { changes: vars },
                authStyle: 'deploy',
            }
        )
    }

    /**
     * List environment variables on a deployment.
     */
    async getEnvVars(deploymentName: string): Promise<ConvexEnvVar[]> {
        return this.request<ConvexEnvVar[]>(
            `https://${deploymentName}.convex.cloud/api/v1/list_environment_variables`,
            { authStyle: 'deploy' }
        )
    }

    /**
     * Push Convex functions and schema to a deployment.
     * Shells out to `npx convex deploy` with the given deploy key.
     */
    deploy(deployKey: string, options: ConvexDeployOptions = {}): void {
        const cwd = options.projectDir || process.cwd()
        const flags = options.flags?.join(' ') || ''
        const cmd = `npx convex deploy --cmd-url-env-var-name CONVEX_URL ${flags}`.trim()

        execSync(cmd, {
            cwd,
            stdio: 'inherit',
            env: {
                ...process.env,
                CONVEX_DEPLOY_KEY: deployKey,
            },
        })
    }

    // ─── Discovery ──────────────────────────────────────────────────────

    /**
     * Resolve token details (type, teamId, name) from the access token.
     */
    async getTokenDetails(): Promise<ConvexTokenDetails> {
        return this.request<ConvexTokenDetails>(
            `${MANAGEMENT_API}/token_details`
        )
    }

    /**
     * List available deployment regions.
     */
    async getRegions(): Promise<ConvexRegion[]> {
        const result = await this.request<{ items: ConvexRegion[] }>(
            `${MANAGEMENT_API}/deployment_regions`
        )
        return result.items
    }

    /**
     * Generate an OpenAPI specification from a Convex deployment.
     *
     * Uses `npx convex-helpers open-api-spec` to introspect the deployment
     * and produce a `convex-spec.yaml` file. You can then use tools like
     * openapi-generator-cli to create type-safe clients in Go, Java, etc.
     *
     * @see https://docs.convex.dev/client/open-api
     */
    generateOpenAPISpec(options: ConvexOpenAPISpecOptions = {}): void {
        const cwd = options.projectDir || process.cwd()
        const output = options.output || 'convex-spec.yaml'
        const extraFlags = options.flags?.join(' ') || ''
        const cmd = `npx convex-helpers open-api-spec --output ${output} ${extraFlags}`.trim()

        execSync(cmd, {
            cwd,
            stdio: 'inherit',
        })
    }

    // ─── Internal Helpers ───────────────────────────────────────────────

    private async resolveTeamId(): Promise<string | number> {
        if (this.teamId) return this.teamId

        // Auto-resolve from token
        const details = await this.getTokenDetails()
        this.teamId = details.teamId
        return this.teamId
    }

    private async request<T = any>(
        url: string,
        options: {
            method?: string
            body?: any
            authStyle?: 'bearer' | 'deploy'
        } = {}
    ): Promise<T> {
        const { method = 'GET', body, authStyle = 'bearer' } = options

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Authorization:
                authStyle === 'deploy'
                    ? `Convex ${this.accessToken}`
                    : `Bearer ${this.accessToken}`,
        }

        const res = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        })

        if (!res.ok) {
            const text = await res.text().catch(() => '')
            throw new Error(
                `Convex API error (${res.status} ${res.statusText}): ${text}`
            )
        }

        // Some endpoints return empty body (e.g., DELETE)
        const text = await res.text()
        if (!text) return undefined as T
        return JSON.parse(text) as T
    }
}
