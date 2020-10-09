import Todo from 'services/http/Todo';
import mockSuccessTodo, { mockSuccessTodoResponse, mockTodoData } from './../../../__mocks__/services/http/todo/MockSuccessTodo';
import mockfailTodo, { mockFailTodoResponse } from './../../../__mocks__/services/http/todo/MockFailTodo';

describe('Todo success', () => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    const method = "GET";
    let todo: Todo;

    beforeEach(() => {
        todo = mockSuccessTodo(mockTodoData)
    })

    it('should instanciate Todo', () => {
        expect(todo).toBeInstanceOf(Todo);
    });

    it('should call execute successfully', async () => {
        const todos = await todo.execute({
            method,
            url,
        });
        
        expect(todos.success).toBe(true);
        expect(todos.response).toEqual(mockSuccessTodoResponse(mockTodoData));
        // expect(todo).toBeInstanceOf(Todo);
    });
});

describe('Todo fail', () => {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    const method = "GET";

    let todo: Todo;

    beforeEach(() => {
        todo = mockfailTodo(mockTodoData)
    })

    it('should instanciate Todo', () => {
        expect(todo).toBeInstanceOf(Todo);
    });

    it('should call execute unsuccessfully', async () => {
        const todos = await todo.execute({
            method,
            url,
        });
        
        expect(todos.success).toBe(false);
        expect(todos.error).not.toBeNull();
        // expect(todo).toBeInstanceOf(Todo);
    });
});