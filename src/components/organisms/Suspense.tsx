import React, { lazy } from "react";
import {
  useQueryCache,
} from "react-query";
import { ErrorBoundary } from "react-error-boundary";


import Button from "components/atoms/Button";
import { IProject } from "interfaces/project";
import { PROJECT } from "services/api";


const Projects = lazy(() => import("components/molecules/Projects"));
const Project = lazy(() => import("components/molecules/Project"));

function Suspense() {
  const cache = useQueryCache();
  const [showProjects, setShowProjects] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState<null | IProject>(null);

  return (
    <>
      <Button
        onClick={() => {
          setShowProjects((old) => {
            if (!old) {
              cache.prefetchQuery("projects", PROJECT.getAll);
            }
            return !old;
          });
        }}
        label={showProjects ? "Hide Projects" : "Show Projects"}
      />

      <hr />

      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <div>
            There was an error!{" "}
            <Button onClick={() => resetErrorBoundary()} label={<pre style={{ whiteSpace: "normal" }}>{"Error"}</pre>}></Button>
          </div>
        )}
        onReset={() => cache.resetErrorBoundaries()}
      >
        <React.Suspense fallback={<h1>Loading projects...</h1>}>
          {showProjects ? (
            activeProject ? (
              <Project
                activeProject={activeProject}
                setActiveProject={setActiveProject}
              />
            ) : (
              <Projects setActiveProject={setActiveProject} />
            )
          ) : null}
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
}


export default Suspense