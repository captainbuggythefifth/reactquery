import HttpRequester, { IHttpRequest } from "./Http"

class Todo {
    private http: HttpRequester;

    constructor(http: HttpRequester) {
        this.http = http;
    }

    execute({ method, url, data }: IHttpRequest) {

        return this.http.execute({
            method,
            url,
            data
        });
    }
};


export default Todo