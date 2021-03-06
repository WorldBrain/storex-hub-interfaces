import { RemoteSubscriptionRequest_v0, ReceivedStorageChangeEvent_v0, AppAvailabilityChangedEvent_v0 } from "./common"

type MethodResult<T> = T | { status: 'not-implemented' }

export interface StorexHubCallbacks_v0 {
    handleRemoteOperation?(options: HandleRemoteOperationOptions_v0): Promise<MethodResult<HandleRemoteOperationResult_v0>>
    handleEvent?(options: HandleEventOptions_v0): Promise<MethodResult<HandleEventResult_v0>>
    handleSubscription?(options: HandleSubscriptionOptions_v0): Promise<MethodResult<HandleSubscriptionResult_v0>>
    handleUnsubscription?(options: HandleUnsubscriptionOptions_v0): Promise<MethodResult<HandleUnubscriptionResult_v0>>
    handleRemoteCall?(options: HandleRemoteCallOptions_v0): Promise<MethodResult<HandleRemoteCallResult_v0>>
}
export type AllStorexHubCallbacks_v0 = { [MethodName in keyof StorexHubCallbacks_v0]-?: StorexHubCallbacks_v0[MethodName] }

export interface HandleRemoteOperationOptions_v0 {
    operation: any[]
    sourceApp: string
}

export interface HandleRemoteOperationResult_v0 {
    status: 'success'
    result: any
}

export interface HandleEventOptions_v0 {
    event: ClientEvent
}

export type ClientEvent = ReceivedStorageChangeEvent_v0 | AppAvailabilityChangedEvent_v0

export type HandleEventResult_v0 = void

export interface HandleSubscriptionOptions_v0 {
    request: RemoteSubscriptionRequest_v0
}

export type HandleSubscriptionResult_v0 = {
    status: 'success'
    subscriptionId: string
}

export interface HandleUnsubscriptionOptions_v0 {
    subscriptionId: string
}

export type HandleUnubscriptionResult_v0 = { status: 'success' }

export interface HandleRemoteCallOptions_v0 {
    call: string
    args: { [key: string]: any }
}

export type HandleRemoteCallResult_v0 = { status: 'success', result: any } | { status: 'call-not-found' | 'invalid-args' } | { status: 'internal-error', errorStatus: string, errorText: string }
