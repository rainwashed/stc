interface IApiResponse {
    error: boolean;
    data?: object | any;
    message?: string;
    reason?: string;
}

export { IApiResponse };
