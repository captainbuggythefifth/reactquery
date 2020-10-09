import React from 'react';
import logo from './logo.svg';
import './App.css';

import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import MainApp from './components/MainApp';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      retry: 0,
      // suspense: true, // enable for Suspense Page
    },
  },
});

function App() {
  return (
    <>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <MainApp />
      </ReactQueryCacheProvider>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
}

export default App;
