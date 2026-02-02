import type { Tool } from './types'

/**
 * Helper to define a tool with type inference.
 * 
 * @example
 * const weatherTool = tool({
 *   name: 'weather',
 *   description: 'Get weather',
 *   parameters: { type: 'object', properties: { location: { type: 'string' } } },
 *   execute: async ({ location }) => { ... }
 * })
 */
export function tool<T = any>(def: Tool<T>): Tool<T> {
    return def
}
