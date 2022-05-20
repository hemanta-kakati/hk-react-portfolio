import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { SingleProject } from "./pages/SingleProject";
import { Error } from "./pages/Error";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />}></Route>
      <Route
        path="single-project/:postId"
        exact
        element={<SingleProject />}
      ></Route>
      <Route path="*" exact element={<Error />}></Route>
    </Routes>
  );
}

export default App;
