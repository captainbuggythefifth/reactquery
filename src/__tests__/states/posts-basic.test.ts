
import { usePostsBasicQuery } from 'states/posts-basics';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import requestor from 'services/http/Requestor';
import axios from './../../__mocks__/libraries/axios';
import HttpRequester from 'services/http/Http';
import { IPost } from 'interfaces/post';

describe('posts-basic success', () => {

    let postsBasic: RenderHookResult<any, any>;

    const mockData: IPost[] = [{ body: "alalalah", id: 1, title: "delectus aut autem", userId: 1 }];

    const mockSuccessIPostResponse = {
        data: mockData,
        status: 200
    };

    beforeEach(() => {

        axios.request.mockReset();
        axios.request.mockImplementationOnce(() =>
            Promise.resolve({
                ...mockSuccessIPostResponse,
            })
        );

        const httpLibrary = new HttpRequester({
            requesterLibrary: axios
        });

        requestor.setLibrary(httpLibrary);
    
        postsBasic = renderHook(() => usePostsBasicQuery());
    })

    it('should return data undefined on first load', async () => {
        expect(postsBasic.result.current.data).toBe(undefined);
    });

    it('should return Posts after loading', async () => {
        await postsBasic.waitForNextUpdate();
        
        expect.arrayContaining(postsBasic.result.current.data);
        expect(postsBasic.result.current.data).toEqual(mockData);
    });
});


describe('posts-basic error', () => {

    let postsBasic: RenderHookResult<any, any>;

    const mockData: IPost[] = [{ body: "alalalah", id: 1, title: "delectus aut autem", userId: 1 }];

    const mockErrorIPostResponse = {
        data: mockData,
        status: 400,
        error: "alalalah ang error"
    };

    beforeEach(() => {

        axios.request.mockReset();
        axios.request.mockImplementationOnce(() =>
            Promise.reject({
                ...mockErrorIPostResponse,
            })
        );

        const httpLibrary = new HttpRequester({
            requesterLibrary: axios
        });

        requestor.setLibrary(httpLibrary);
    
        postsBasic = renderHook(() => usePostsBasicQuery());
    })


    it('should return Posts error', async () => {
        await postsBasic.waitForNextUpdate();
        expect(postsBasic.result.current.data).toEqual(undefined);
    });
})