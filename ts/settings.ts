export interface SettingsDescription {
    layout: SettingDescriptionLayout
    fields: { [name: string]: SettingsDescriptionField }
}

// Layout
export interface SettingDescriptionLayout {
    sections: SettingDescriptionLayoutSection[]
}

export interface SettingDescriptionLayoutSection {
    title: string
    contents: Array<SettingDescriptionLayoutField | SettingDescriptionLayoutGroup>
}

export interface SettingDescriptionLayoutField {
    field: string
}

export interface SettingDescriptionLayoutGroup {
    group: {
        title: string,
        fields: Array<SettingDescriptionLayoutField>
    }
}

// Data types
export type SettingsDescriptionField = PrimitiveSettingDescriptionField | ArraySettingDescriptionField
export type PrimitiveSettingDescriptionField = StringSettingDescriptionField | BooleanSettingDescriptionField | NumberSettingDescriptionField

export interface SettingsDescriptionFieldBase {
    label: string
    optional?: boolean
}

export interface StringSettingDescriptionField extends SettingsDescriptionFieldBase {
    type: 'string'
    widget: { type: 'text-input' }
}

export interface BooleanSettingDescriptionField extends SettingsDescriptionFieldBase {
    type: 'boolean'
    widget: { type: 'checkbox' }
}

export interface NumberSettingDescriptionField extends SettingsDescriptionFieldBase {
    type: 'number'
    widget: { type: 'text-input' }
}

export interface ArraySettingDescriptionField extends SettingsDescriptionFieldBase {
    type: 'array'
    widget: { type: 'tag-input' }
    children: Pick<PrimitiveSettingDescriptionField, 'type'>
}

export interface TagInputWidget {
    type: 'tag-input'
    suggestTags?: { call: string, app?: string }
    addTag?: { call: string, app?: string }
}
