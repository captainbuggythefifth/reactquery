/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const Example = () => {
    const { isLoading, error, data } = useQuery("repoData", () =>
        fetch(
            "https://api.github.com/repos/tannerlinsley/react-query"
        ).then((res) => res.json())
    );

    if (isLoading) return <>Loading..."</>;

    if (error) return <>An error has occurred: " + error</>;

    return (
        <div>
            <strong><a href="https://react-query.tanstack.com/docs/examples/simple" target="_blank">LINK</a></strong>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{" "}
            <strong>✨ {data.stargazers_count}</strong>{" "}
            <strong>🍴 {data.forks_count}</strong>
            <ReactQueryDevtools initialIsOpen />
        </div>
    );
}

export default Example
