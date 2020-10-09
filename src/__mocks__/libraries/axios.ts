export interface IAxiosResponse<T = any> {
    status: number | null,
    data: T
}

export interface IAxiosError<T = any> extends Error {
    config: any; // AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: IAxiosResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
}

interface IAxiosRequest {
    timeout: number
}

export interface IMockHttpRequestProps {
    timeResponse: number,
    timeout: number
}

export const axiosMockHttpRequest = ({ timeResponse = 2000, timeout = 10000 }: IMockHttpRequestProps): Promise<IAxiosResponse | IAxiosError> => {
    if (timeResponse > timeout) {
        setTimeout(() => {
            return Promise.reject({
                config: null, // AxiosRequestConfig;
                isAxiosError: true,
                toJSON: () => { }
            })
        }, timeout);
    }

    return Promise.resolve({
        data: {},
        status: null
    })
}

const axios = {
    request: jest.fn(({ 
        timeResponse,
        timeout }) => axiosMockHttpRequest({
            timeResponse,
            timeout
        })),
    CancelToken: {
        source: () => {
            const token = 123456;
            return {
                token,
                cancel: () => {
                    return `cancelled ${token}`
                }
            }
        }
    }
};



export default axios