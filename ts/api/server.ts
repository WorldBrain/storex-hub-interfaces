import { AppSchema } from '../apps';
import * as common from './common';

export interface StorexHubApi_v0 {
    registerApp(options: RegisterAppOptions_v0): Promise<RegisterAppResult_v0>
    identifyApp(options: IdentifyAppOptions_v0): Promise<IdentifyAppResult_v0>
    getSessionInfo(): Promise<GetSessionInfoResult_v0>
    // unidentifyApp() : Promise<void>
    destroySession(): Promise<void>

    executeOperation(options: ExecuteOperationOptions_v0): Promise<ExecuteOperationResult_v0>

    executeRemoteOperation(options: ExecuteRemoteOperationOptions_v0): Promise<ExecuteRemoteOperationResult_v0>

    subscribeToEvent(options: SubscribeToEventOptions_v0): Promise<SubscribeToEventResult_v0>
    unsubscribeFromEvent(options: UnsubscribeFromEventOptions_v0): Promise<UnsubscribeFromEventResult_v0>
    emitEvent(options: EmitEventOptions_v0): Promise<EmitEventResult_v0>

    // requestPriviliges(options : {  }) : Promise<{}>
    // listPrivileges() : Promise<{}>

    updateSchema(options: UpdateSchemaOptions_v0): Promise<UpdateSchemaResult_v0>
    // describeSchema() : Promise<{}> // In terms of RDF
    // updateAccessRules() : Promise<{}>

    // startMigration() : Promise<{}>
    // getMigrationStatus() : Promise<{}>

    // exportData() : Promise<{}>
    // importData(source : string, options : { mode : 'merge' | 'overwrite' }) : Promise<{}>

    // storeSecret() : Promise<{}>
    // getSecret() : Promise<{}>
    // deleteSecret() : Promise<{}>

    setAppSettings(options: SetAppSettingsOptions_v0): Promise<SetAppSettingsResult_v0>
    getAppSettings(options: GetAppSettingsOptions_v0): Promise<GetAppSettingsResult_v0>
    deleteAppSettings(options: DeleteAppSettingsOptions_v0): Promise<DeleteAppSettingsResult_v0>
}

export interface RegisterAppOptions_v0 {
    name: string
    remote?: boolean
    identify?: boolean
}

export type RegisterAppResult_v0 = { status: 'success', accessToken: string }
    | { status: 'app-already-exists' }

export interface IdentifyAppOptions_v0 {
    name: string
    accessToken: string
}

export type IdentifyAppResult_v0 = { status: 'success' } |
{ status: 'invalid-access-token' | 'dupliicate-identification' }

export type GetSessionInfoResult_v0 = {
    status: 'success',
    appIdentifier?: string
}

export interface ExecuteOperationOptions_v0 {
    operation: any[]
}
export type ExecuteOperationResult_v0 =
    { status: 'success', result: any } |
    { status: 'no-schema-found' }

export interface ExecuteRemoteOperationOptions_v0 {
    app: string
    operation: any[]
}
export type ExecuteRemoteOperationResult_v0 =
    { status: 'success', result: any } |
    { status: 'not-identified' } |
    { status: 'app-not-found' } |
    { status: 'app-not-supported' }

export interface SubscribeToEventOptions_v0 {
    request: SubscriptionRequest_v0
}
export type SubscriptionRequest_v0 =
    common.AppAvailabilityChangedSubscriptionRequest_v0 |
    ({ app: string } & common.RemoteSubscriptionRequest_v0)



export type SubscribeToEventResult_v0 =
    { status: 'unsupported-event' } |
    { status: 'app-not-found' } |
    { status: 'app-not-supported' } |
    { status: 'success', subscriptionId: string }

export interface UnsubscribeFromEventOptions_v0 {
    subscriptionId: string
}
export type UnsubscribeFromEventResult_v0 = void

export interface EmitEventOptions_v0 {
    event: EmittableEvent_v0
    synchronous?: boolean
}
export type EmitEventResult_v0 = void

export type EmittableEvent_v0 = common.SentStorageChangeEvent_v0

export interface UpdateSchemaOptions_v0 {
    schema: AppSchema
}

export type UpdateSchemaResult_v0 = { success: true } | { success: false, errorCode: UpdateSchemaError_v0, errorText: string }

export enum UpdateSchemaError_v0 {
    BAD_REQUEST = 1,
    NOT_ALLOWED = 2,
    SCHEMA_NOT_ALLOWED = 3,
}

export type AppSettingValue = string | number | boolean | null

export interface GetAppSettingsOptions_v0 {
    keys: string[] | 'all'
}

export type GetAppSettingsResult_v0 = {
    status: 'success'
    settings: { [key: string]: AppSettingValue }
} | {
    status: 'not-identified'
}

export interface SetAppSettingsOptions_v0 {
    updates: { [key: string]: AppSettingValue }
}

export type SetAppSettingsResult_v0 = { status: 'success' } | { status: 'not-identified' }

export interface DeleteAppSettingsOptions_v0 {
    keys: string[] | 'all'
}

export type DeleteAppSettingsResult_v0 =
    { status: 'success' } |
    { status: 'not-identified' } |
    { status: 'non-existing-keys', keys: string[] }

export type MethodDescription = SyncMethodDescription
export interface SyncMethodDescription {
    path: string
}

export const STOREX_HUB_API_v0: { [MethodName in keyof StorexHubApi_v0]: MethodDescription } = {
    registerApp: {
        path: '/app/register',
    },
    identifyApp: {
        path: '/app/identify',
    },
    getSessionInfo: {
        path: '/session',
    },
    destroySession: {
        path: '/session/destroy',
    },
    executeOperation: {
        path: '/storage/operation',
    },
    updateSchema: {
        path: '/schema/update',
    },
    executeRemoteOperation: {
        path: '/remote/operation'
    },
    subscribeToEvent: {
        path: '/remote/event/subscribe'
    },
    unsubscribeFromEvent: {
        path: '/remote/event/unsubscribe'
    },
    emitEvent: {
        path: '/event/emit'
    },
    setAppSettings: {
        path: '/app/settings/set'
    },
    getAppSettings: {
        path: '/app/settings/get'
    },
    deleteAppSettings: {
        path: '/app/settings/delete'
    }
}
