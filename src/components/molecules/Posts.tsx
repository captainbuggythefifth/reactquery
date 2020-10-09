import React from 'react';
import { basicTextError, basicTextLoading, IPostProps } from "components/organisms/Basic";
import { useQueryCache } from "react-query";
import { usePostsBasicQuery } from "states/posts-basics";
import { IPost } from 'interfaces/post';

const Posts = ({ setPostId }: IPostProps) => {
    const cache = useQueryCache();

    const { status, data, error, isFetching } = usePostsBasicQuery();

    return (
        <div>
            <h1>Posts</h1>
            <div>
                {status === "loading" ? (
                    <p>{basicTextLoading}</p>
                ) : status === "error" ? (
                    <span>{basicTextError}</span>
                ) : (
                            <>
                                <div>
                                    {data && data.map((post: IPost) => (
                                        <p key={post.id}>
                                            <a
                                                onClick={() => setPostId(post.id)}
                                                href="#"
                                                style={
                                                    // We can use the queryCache here to show bold links for
                                                    // ones that are cached
                                                    cache.getQueryData(["post-basic", post.id])
                                                        ? {
                                                            fontWeight: "bold",
                                                            color: "green",
                                                        }
                                                        : {}
                                                }
                                            >
                                                {post.title}
                                            </a>
                                        </p>
                                    ))}
                                </div>
                                <div>{isFetching ? "Background Updating..." : " "}</div>
                            </>
                        )}
            </div>
        </div>
    );
}

export default Posts