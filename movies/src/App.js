import logo from "./logo.svg";
import "./App.css";
import MoviesPage from "./component/MoviesPage";
// import MoviePage2 from "./component/MoviePage2";
import New from "./component/New";
function App() {
    return (
        <>
            <New></New>
            <MoviesPage></MoviesPage>,{/* <MoviePage2></MoviePage2>  */}
        </>
    );
}

export default App;
