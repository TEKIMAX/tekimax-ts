
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

const PACKAGES_TO_MONITOR = [
    'openai',
    '@anthropic-ai/sdk',
    '@google/generative-ai',
    'ollama'
]

async function getLatestVersion(packageName: string): Promise<string> {
    const { stdout } = await execAsync(`npm view ${packageName} version`)
    return stdout.trim()
}

// Assuming script is run from project root or via npm script in packages/tekimax-ts
// We will look for package.json relative to the script location
const scriptDir = path.dirname(new URL(import.meta.url).pathname)
const projectRoot = path.resolve(scriptDir, '..') // Up from scripts/
const packageJsonPath = path.join(projectRoot, 'packages/tekimax-ts/package.json')

async function checkUpdates() {
    console.log(`📂 Reading dependencies from: ${packageJsonPath}`)
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const dependencies = packageJson.dependencies || {}

    console.log("🔍 Checking for AI Provider SDK updates...")
    console.log("----------------------------------------")

    let hasUpdates = false

    for (const pkg of PACKAGES_TO_MONITOR) {
        const currentVersion = dependencies[pkg]?.replace('^', '').replace('~', '')
        if (!currentVersion) {
            console.warn(`⚠️  ${pkg} not found in dependencies`)
            continue
        }

        try {
            const latestVersion = await getLatestVersion(pkg)
            if (currentVersion !== latestVersion) {
                console.log(`🚀 Update available for ${pkg}: ${currentVersion} -> ${latestVersion}`)
                hasUpdates = true
            } else {
                console.log(`✅ ${pkg} is up to date (${currentVersion})`)
            }
        } catch (error) {
            console.error(`❌ Failed to check ${pkg}:`, error)
        }
    }

    console.log("----------------------------------------")
    if (hasUpdates) {
        console.log("💡 Run 'npm update' in packages/tekimax-ts to upgrade.")
        process.exit(1) // Exit with error code to fail CI if updates are needed (optional)
    } else {
        console.log("✨ All provider SDKs are up to date.")
    }
}

checkUpdates().catch(console.error)
