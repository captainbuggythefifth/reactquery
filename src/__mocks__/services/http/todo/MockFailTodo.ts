import axios from './../../../../__mocks__/libraries/axios';
import HttpRequester from 'services/http/Http';
import Todo from 'services/http/Todo';
import { ITodo } from 'interfaces/todo';
import { mockTodoData } from './MockSuccessTodo';

const failStatus = 400;

export const mockFailTodoResponse = (data: ITodo) => ({
    data,
    status: failStatus
})

const mockFailTodo = (data: ITodo) => {
    let httpRequester: HttpRequester;
    let MockfailTodo: Todo;
    
    axios.request.mockReset();
    axios.request.mockImplementationOnce(() =>
        Promise.reject({
            ...mockFailTodoResponse(mockTodoData),
            data
        })
    );
    
    httpRequester = new HttpRequester({
        requesterLibrary: axios
    })
    
    MockfailTodo = new Todo(httpRequester);

    return MockfailTodo
}



export default mockFailTodo