import { CancelTokenSource } from "axios";

export interface IHttpRequest {
    method: "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined,
    url: string,
    data?: any
}

interface IHttpRequesterConstructor {
    token?: string,
    refreshToken?: string,
    timeout?: number,
    requesterLibrary: any,
    cancelSource?: CancelTokenSource | null,
}

interface IHttpRequestExecuteResult {
    response: any,
    error: any,
    success: boolean
}

class HttpRequester {
    private token: string;
    private refreshToken: string;
    private timeout: number;
    private cancelSource: CancelTokenSource | null;
    private requesterLibrary: any

    constructor({ requesterLibrary, token = "", refreshToken = "", timeout = 5000, cancelSource = null }: IHttpRequesterConstructor) {
        this.requesterLibrary = requesterLibrary;
        this.token = token;
        this.refreshToken = refreshToken;
        this.timeout = timeout;
        this.cancelSource = cancelSource
    }

    public setToken(token: string): void {
        this.token = token
    }

    public getToken(): string {
        return this.token
    }

    public setRefreshToken(refreshToken: string): void {
        this.refreshToken = refreshToken
    }

    public getRefreshToken(): string {
        return this.refreshToken
    }

    public setTimeout(timeout: number): void {
        this.timeout = timeout
    };

    public getTimeout(): number {
        return this.timeout
    }

    public async execute({ method = "GET", url, data }: IHttpRequest) {
        
        let result: IHttpRequestExecuteResult = {
            response: null,
            success: false,
            error: null
        }

        const source = this.requesterLibrary.CancelToken.source();
        
        this.setCancelSource(source);

        try {
            const res = await this.requesterLibrary.request({
                cancelToken: source.token,
                timeout: this.timeout,
                method,
                url,
                data
            });

            result = {
                ...result,
                response: res,
                success: res.status >= 200 && res.status < 300
            }

            return result
        } catch (e) {
            result = {
                ...result,
                error: e
            }

            return result
        }
    }

    private setCancelSource(source: any) {
        this.cancelSource = source
    }

    public async cancel () {
        if(this.cancelSource) {
            return this.cancelSource.cancel();
        }
    }
    
}

export default HttpRequester