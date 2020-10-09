import Button from "components/atoms/Button";
import Spinner from "components/atoms/Spinner";
import { IProject } from "interfaces/project";
import React from "react";
import { useQuery, useQueryCache } from "react-query";
import { PROJECT } from "services/api";



interface IProjectsProps {
    setActiveProject: Function
}
export default function Projects({ setActiveProject }: IProjectsProps) {
    const cache = useQueryCache();
    const { data, isFetching } = useQuery<IProject[]>("projects", PROJECT.getAll);

    return (
        <div>
            <h1>Projects {isFetching ? <Spinner /> : null}</h1>
            {data && data.map((project) => (
                <p key={project.name}>
                    <Button
                        onClick={() => {
                            // Prefetch the project query
                            cache.prefetchQuery(
                                ["project", { id: project.name }],
                                async () => await PROJECT.getByName(project.name)
                            );
                            setActiveProject(project.name);
                        }}
                        label={"Load"}
                    />

                    {project.name}
                </p>
            ))}
        </div>
    );
}