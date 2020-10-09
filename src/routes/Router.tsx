import React from "react";
import {
    BrowserRouter as ThirdPartyRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AutoRefetchingPages from "pages/AutoRefetchingPages";
import BasicPage from "pages/BasicPage";
import BasicWithGraphQLRequestPage from "pages/BasicWithGraphQLRequestPage";
import ExamplePage from "pages/ExamplePage";
import SuspensePage from "pages/SuspensePage";


const Router = () => {
    return (
        <ThirdPartyRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/example">Example</Link>
                        </li>
                        <li>
                            <Link to="/basic">Basic</Link>
                        </li>
                        <li>
                            <Link to="/basic-with-graphql-request">Basic with GraphQL Request</Link>
                        </li>
                        <li>
                            <Link to="/auto-refetching">Auto Refetching</Link>
                        </li>
                        <li>
                            <Link to="/suspense">Suspense</Link>
                        </li>
                    </ul>
                </nav>
                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/example">
                        <ExamplePage />
                    </Route>
                    <Route path="/basic">
                        <BasicPage />
                    </Route>
                    <Route path="/basic-with-graphql-request">
                        <BasicWithGraphQLRequestPage />
                    </Route>
                    <Route path="/auto-refetching">
                        <AutoRefetchingPages />
                    </Route>
                    <Route path="/suspense">
                        <SuspensePage />
                    </Route>
                </Switch>
            </div>
        </ThirdPartyRouter>
    )
}

export default Router