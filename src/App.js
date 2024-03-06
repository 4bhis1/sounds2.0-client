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
  var options = {
    video: true,
    audio: true,
  };
  navigator.getUserMedia(
    options,
    function (stream) {
      console.log(stream, "streaming");
    },
    function (e) {
      console.log("background error : " + e.name);
    }
  );

  return <RouterProvider router={router} />;
};

export default App;
