export interface RecipeDefinition {
    settings: { keys: string[] | 'all' }
    select: RecipeDataSelection
    process: RecipeDataProcessor[]
    execute: RecipeAction[]
}

export interface RecipeDataSelection {
    placeholder: string
    app: string
    collection: string
    where: { [key: string]: any }
}

export type RecipeDataProcessor = FindDataProcessor
export interface RecipeDataProcessorBase {
    placeholder: string
}

export interface FindDataProcessor extends RecipeDataProcessorBase {
    operation: 'findObject' | 'findObjects'
    app: string
    collection: string
    where: { [key: string]: any }
}

export interface RecipeAction {
    app: string
    call: { [key: string]: any }
}
