import React from 'react';
import { useQuery, useQueryCache } from 'react-query';
import { request, gql } from "graphql-request";

const endpoint = "https://graphqlzero.almansi.me/api";


const BasicWithGraphQLRequest = () => {
    const [postId, setPostId] = React.useState(-1);

    return (
        <>
            <p>
                As you visit the posts below, you will notice them in a loading state
                the first time you load them. However, after you return to this list and
                click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
                <strong>
                    (You may need to throttle your network speed to simulate longer
                    loading sequences)
        </strong>
            </p>
            {postId > -1 ? (
                <Post postId={postId} setPostId={setPostId} />
            ) : (
                    <Posts postId={-1} setPostId={setPostId} />
                )}
        </>
    )
}

export default BasicWithGraphQLRequest

interface IPostProps {
    setPostId: Function,
    postId: number
}

interface IPost {
    userId: number,
    id: number,
    title: string
    body: string
}


function usePosts() {
    return useQuery("posts-basic-with-graphql-request", async () => {
        const {
            posts: { data },
        } = await request(
            endpoint,
            gql`
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `
        );
        return data;
    });
}

function Posts({ setPostId }: IPostProps) {
    const cache = useQueryCache();
    const { status, data, error, isFetching } = usePosts();

    return (
        <div>
            <h1>Posts</h1>
            <div>
                {status === "loading" ? (
                    "Loading..."
                ) : status === "error" ? (
                    <span>Error: {error}</span>
                ) : (
                            <>
                                <div>
                                    {data.map((post: IPost) => (
                                        <p key={post.id}>
                                            <a
                                                onClick={() => setPostId(post.id)}
                                                href="#"
                                                style={
                                                    // We can use the queryCache here to show bold links for
                                                    // ones that are cached
                                                    cache.getQueryData(["post", post.id])
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

function usePost(postId: number) {
    return useQuery(
        ["post", postId],
        async () => {
            const { post } = await request(
                endpoint,
                gql`
          query {
            post(id: ${postId}) {
              id
              title
              body
            }
          }
          `
            );

            return post;
        },
        {
            enabled: postId,
        }
    );
}

function Post({ postId, setPostId }: IPostProps) {
    const { status, data, error, isFetching } = usePost(postId);

    return (
        <div>
            <div>
                <a onClick={() => setPostId(-1)} href="#">
                    Back
          </a>
            </div>
            {!postId || status === "loading" ? (
                "Loading..."
            ) : status === "error" ? (
                <span>Error: {error}</span>
            ) : (
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