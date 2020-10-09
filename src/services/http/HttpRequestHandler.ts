import HttpRequester, { IHttpRequest } from "./Http"

interface IHttpRequestHandlerProps extends IHttpRequest {
    requestLibrary: any
}

interface IHttpRequestHandlerResult {
    response: any,
    error: any,
    success: boolean
}

const httpRequesterHandler = async ({requestLibrary, ...props}: IHttpRequestHandlerProps) => {
    
    let result: IHttpRequestHandlerResult = {
        response: null,
        success: false,
        error: null
    }

    const httpRequester = new HttpRequester(requestLibrary);

    try {
        const resultRequest = httpRequester.execute(props);
        result = {
            ...result,
            success: true,
            response: resultRequest,
        }
        return result
    } catch (error) {
        
    }
}