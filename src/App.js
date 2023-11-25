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
import AddMovie from "./Pages/Admin/add";

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
          <Route path="/watchlist" element={<Watchlist />} />
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
