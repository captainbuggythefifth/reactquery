import axios from './../../../../__mocks__/libraries/axios';
import HttpRequester from 'services/http/Http';
import Todo from 'services/http/Todo';
import { ITodo } from 'interfaces/todo';

export const mockTodoData = { completed: false, id: 1, title: "delectus aut autem", userId: 1 };
const mockSuccessStatus = 200;

export const mockSuccessTodoResponse = (data: ITodo) => ({
    data,
    status: mockSuccessStatus
})

const mockSuccessTodo = (data: ITodo) => {
    let httpRequester: HttpRequester;
    let MockSuccessTodo: Todo;

    axios.request.mockReset();
    axios.request.mockImplementationOnce(() =>
        Promise.resolve({
            ...mockSuccessTodoResponse(mockTodoData),
            data
        })
    );

    httpRequester = new HttpRequester({
        requesterLibrary: axios
    })

    MockSuccessTodo = new Todo(httpRequester);

    return MockSuccessTodo
}

export default mockSuccessTodo