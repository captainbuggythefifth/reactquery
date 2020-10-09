import React from 'react';

import { basicTextError, basicTextLoading, IPostProps } from "components/organisms/Basic";
import { usePostBasicQuery } from 'states/posts-basics';

const Post = ({ postId, setPostId }: IPostProps) => {
    const { status, data, error, isFetching } = usePostBasicQuery(postId);

    return (
        <div>
            <div>
                <a onClick={() => setPostId(-1)} href="#">
                    Back
                </a>
            </div>
            {status === "loading" ? (
                <p>{basicTextLoading}</p>
            ) : status === "error" ? (
                <span>{basicTextError}</span>
            ) : data && (
                <>
                    <h1>{data.title}</h1>
                    <div>
                        <p>{data.body}</p>
                    </div>
                    <div>{isFetching ? "Background Updating..." : " "}</div>
                </>
            )}
        </div>
    );
}

export default Post