import { StorexHubApi_v0, StorexHubCallbacks_v0 } from "./api";

export interface PluginInfo {
    identifier: string
    version: string
    description: string
    apps: Array<{ name: string, description?: string }>
    siteUrl: string
    mainPath: string
    entryFunction: string
}

export interface PluginInterface {
    start(): Promise<void>
    stop(): Promise<void>
}

export type PluginEntryFunction = (input: { getApi: (options?: { callbacks?: StorexHubCallbacks_v0 }) => Promise<StorexHubApi_v0> }) => Promise<PluginInterface>
