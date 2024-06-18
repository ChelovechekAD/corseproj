export interface ExceptionResponse {
    timeStamp: string,
    httpStatusCode: number,
    exceptionMessage: string | null,
    exceptionDetails: string | null
}