export interface RecipeDefinition {
    settings?: { keys: string[] | 'all' }
    select: RecipeDataSelection
    on: {
        add?: RecipeAction[],
        change?: RecipeAction[],
        remove?: RecipeAction[],
    }
}

export interface RecipeDataSelection {
    placeholder: string
    app: string
    remote?: boolean
    collection: string
    where: { [key: string]: any }
}

export type RecipeAction = FindOperationAction | CallAction
export interface RecipeActionBase {
    placeholder?: string
}

export interface FindOperationAction extends RecipeActionBase {
    operation: 'findObject' | 'findObjects'
    app: string
    remote?: boolean
    collection: string
    where: { [key: string]: any }
}

export interface CallAction extends RecipeActionBase {
    app: string
    call: string
    args: { [key: string]: any }
}
