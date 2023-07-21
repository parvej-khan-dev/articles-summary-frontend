import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import logo from "./assets/logo.svg";
import { Home, CreatePost } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    // routing for navigate page
    <BrowserRouter>
      {/* header and navbar section */}
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <div className="flex gap-3 md:gap-5 justify-between items-center">
          <Link to="/">Home</Link>
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
        </div>
      </header>
      {/* main section their home and create Post page render */}
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>

        <ToastContainer />
      </main>
    </BrowserRouter>
  );
};

export default App;
