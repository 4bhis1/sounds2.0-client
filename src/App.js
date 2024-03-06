import React from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Upload from "./pages/Upload";
import Play from "./pages/Play";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/play" />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/play" element={<Play />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
