export type FieldError = {
    [elementId: string]: string
}

export interface MessageState {
    summary: string;
    isError: boolean;
    errors?: FieldError,
}