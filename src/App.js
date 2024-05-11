import { Route, Routes } from "react-router-dom";
import "./App.css";
import Posts from "./Posts/Posts";
import Edit from "./Posts/Edit";
import Add from "./Posts/Add";
import Details from "./Posts/Details";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Posts/Header";
import Footer from "./Posts/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Posts />} />
        <Route path="/add" element={<Add />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
