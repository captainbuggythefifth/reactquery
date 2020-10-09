import HttpRequester from 'services/http/Http';
import axios, { IAxiosResponse, IAxiosError, axiosMockHttpRequest } from "./../../../__mocks__/libraries/axios";
// import axios from 'axios';

describe('Http properties', () => {
    let httpRequester1: HttpRequester;

    beforeEach(() => {
        httpRequester1 = new HttpRequester({
            requesterLibrary: axios
        });
    });

    it('should be intanciated', () => {
        expect(httpRequester1).toBeInstanceOf(HttpRequester);
    });

    it('should have property of request', () => {
        expect(httpRequester1).toHaveProperty("execute");
    });

    it('should have property of token', () => {
        expect(httpRequester1).toHaveProperty("token");
    });

    it('should have property of refreshToken', () => {
        expect(httpRequester1).toHaveProperty("refreshToken");
    });

    it('should have property of cancelSource', () => {
        expect(httpRequester1).toHaveProperty("cancelSource");
    });

    it('should set the value of token', () => {
        const token = "this is the token";
        httpRequester1.setToken(token);
        expect(httpRequester1.getToken()).toEqual(token);
    });

    it('should set the value of refreshToken', () => {
        const token = "this is the refreshToken";
        httpRequester1.setRefreshToken(token);
        expect(httpRequester1.getRefreshToken()).toEqual(token);
    });

    it('should set the value of setTimeout', () => {
        const timeout = 1000;
        httpRequester1.setTimeout(timeout);
        expect(httpRequester1.getTimeout()).toEqual(timeout);
    });

});


describe('Http functionalities', () => {
    let httpRequester1: HttpRequester;
    interface IMockHttpRequestProps {
        timeResponse: number,
        timeout: number
    }

    beforeEach(() => {
        httpRequester1 = new HttpRequester({
            requesterLibrary: axios
        });
    });

    it('should have successful execute returns object.success', async () => {

        const url = "https://jsonplaceholder.typicode.com/todos/1";
        const method = "GET";
        const result = { completed: false, id: 1, title: "delectus aut autem", userId: 1 };
        const status = 200;

        axios.request.mockImplementationOnce(() =>
            Promise.resolve({
                data: result,
                status
            })
        );

        const httpRequesterResult = await httpRequester1.execute({
            method,
            url
        });

        expect(httpRequesterResult.error).toBeNull();
        expect(httpRequesterResult.success).toEqual(true);
        expect(httpRequesterResult.response.status).toEqual(status);
    });

    it('should have unsuccessful execute returns object.error when timeout is set and is greater than response time', async () => {

        const responseTimeout = 5000;
        const responseTime = 20000;

        httpRequester1.setTimeout(responseTimeout);

        const url = "https://jsonplaceholder.typicode.com/todos/1";
        const method = "GET";
        
        axios.request.mockImplementationOnce(({ timeResponse = responseTime, timeout = responseTimeout }: IMockHttpRequestProps): Promise<IAxiosResponse | IAxiosError> => {
            if (timeResponse > timeout) {
                
                return Promise.reject({
                    config: null, // AxiosRequestConfig;
                    isAxiosError: true,
                    toJSON: () => { }
                })
            }

            return Promise.resolve({
                data: {},
                status: null
            });
        });

        const httpRequesterResult = await httpRequester1.execute({
            method,
            url
        });

        expect(httpRequesterResult.error).not.toBeNull();
        expect(httpRequesterResult.success).toEqual(false);
    });

    it('should have unsuccessful execute returns object.error when cancel is called', async () => {

        const responseTimeout = 5000;
        const responseTime = 20000;

        // httpRequester1.setTimeout(responseTimeout);

        const url = "https://jsonplaceholder.typicode.com/todos/1";
        const method = "GET";
        
        axios.request.mockImplementationOnce(({ timeResponse = responseTime, timeout = responseTimeout }: IMockHttpRequestProps): Promise<IAxiosResponse | IAxiosError> => {
            return Promise.reject({
                config: null, // AxiosRequestConfig;
                isAxiosError: true,
                toJSON: () => { }
            })
        });

        const httpRequesterResult = await httpRequester1.execute({
            method,
            url
        });

        const cancelResult = httpRequester1.cancel();

        expect(httpRequesterResult.error).not.toBeNull();
        expect(httpRequesterResult.success).toEqual(false);
    })
})