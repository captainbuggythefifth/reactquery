import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react'
import { render, fireEvent, screen, RenderResult, act } from '@testing-library/react'
import Basic, { basicTextLoading, basicTextParagraph1, basicTextParagraphStrong1 } from 'components/organisms/Basic'
import axios from './../../../__mocks__/libraries/axios'
import HttpRequester from 'services/http/Http'
import { IPost } from 'interfaces/post'
import requestor from 'services/http/Requestor';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks'
import { usePostBasicQuery, usePostsBasicQuery } from 'states/posts-basics'

describe('Basic render', () => {
    let postsBasic: RenderHookResult<any, any>;
    let wrapper: RenderResult;
    const mockData: IPost[] = [{ body: "alalalah", id: 1, title: "delectus aut autem", userId: 1 }];

    const mockSuccessIPostResponse = {
        data: mockData,
        status: 200
    };

    const timeOut = 2000;

    beforeEach(() => {
        axios.request.mockReset();

        // to simulate the loading screen before fetching the data
        setTimeout(() => {
            axios.request.mockImplementationOnce(() =>
                Promise.resolve({
                    ...mockSuccessIPostResponse,
                })
            );
        }, timeOut)


        const httpLibrary = new HttpRequester({
            requesterLibrary: axios
        });

        requestor.setLibrary(httpLibrary);
        postsBasic = renderHook(() => usePostsBasicQuery());
        wrapper = render(<Basic />);

    });

    it('should have texts in the paragraph', () => {
        expect(screen.getByText(basicTextParagraph1)).toBeInTheDocument()
    });

    it('should have texts in the paragraph strong', () => {
        expect(screen.getByText(basicTextParagraphStrong1)).toBeInTheDocument()
    });

    it('should have loading', () => {
        expect(screen.getByText(basicTextLoading)).toBeInTheDocument()
    });

    it('should load data', async () => {
        setTimeout(() => {
            expect(screen.getByText(mockData[0].title)).toBeInTheDocument()
        }, timeOut + 1000); // had to add 1 more second to be sure the data is loaded

    });
});


describe('Basic interaction', () => {
    let postsBasic: RenderHookResult<any, any>;
    let postBasic: RenderHookResult<any, any>;
    let wrapper: RenderResult;
    const mockData: IPost[] = [{ body: "alalalah", id: 1, title: "delectus aut autem", userId: 1 }];

    const mockSuccessIPostResponse = {
        data: mockData,
        status: 200
    };

    const timeOut = 2000;
    const onClick = jest.fn()

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

        wrapper = render(<Basic />);

    });

    

    it('should load data and click the first element', async () => {
        const title = mockData[0].title;
        const body = mockData[0].body;
        const id = mockData[0].id

        // Wait for the data to load
        await postsBasic.waitForNextUpdate();
        await act(async () => { });

        expect(screen.getByText(title)).toBeInTheDocument()
        
        // Fireevent click to render Post component
        fireEvent.click(screen.getByText(title));
        await act(async () => { });

        
        // Reset the http handler
        axios.request.mockReset();

        axios.request.mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                data: mockData[0]
            })
        );

        postBasic = renderHook(() => usePostBasicQuery(id));

        // Wait for the data to load
        await postBasic.waitForNextUpdate();

        expect(screen.getByText(title)).toBeInTheDocument()
        expect(screen.getByText(body)).toBeInTheDocument()
        // expect(onClick).toHaveBeenCalled();

    });
})