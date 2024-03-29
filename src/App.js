import "./App.css";
import MovieCard from "./Pages/Components/MovieCard";
import Watchlist from "./Pages/WatchList";
import Home from "./Pages/Home";
import MovieRatings from "./Pages/MovieRatings";
import Movies from "./Pages/Movies";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import MoviePage from "./Pages/Movies";
import SearchResult from "./Pages/SearchResult";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import MovieDetail from "./Pages/MovieDetail";
import AddMovie from "./Pages/Admin/addmovie";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import AddAdmin from "./Pages/Admin/addadmin";
import MovieAddRequestPage from "./Pages/SuperAdmin/MovieAddRequest";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/admin" element={<AddMovie />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/addadmin" element={<AddAdmin />} />
          <Route path="/addmovierequest" element={<MovieAddRequestPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/movieratings" element={<MovieRatings />} />
          <Route path="/search/:id" element={<SearchResult />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
