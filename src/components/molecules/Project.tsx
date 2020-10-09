import React from "react";
import { useQuery } from "react-query";



// import { fetchProject } from "../queries";
import { IProject } from "interfaces/project";
import Button from "components/atoms/Button";
import Spinner from "components/atoms/Spinner";
import { PROJECT } from "services/api";



interface IProjectProps {
    activeProject: IProject,
    setActiveProject: Function
}

export default function Project({ activeProject, setActiveProject }: IProjectProps) {
  const { data, isFetching } = useQuery<IProject>(
    ["project", { id: activeProject }],
    PROJECT.getAll
  );

  return (
    <div>
      <Button onClick={() => setActiveProject(null)} label={"Back"} />
      <h1>
        {activeProject} {isFetching ? <Spinner /> : null}
      </h1>
      {data ? (
        <div>
          <p>forks: {data.forks_count}</p>
          <p>stars: {data.stargazers_count}</p>
          <p>watchers: {data.watchers}</p>
        </div>
      ) : null}
      <br />
      <br />
    </div>
  );
}