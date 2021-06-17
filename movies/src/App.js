import "./App.css";
import MoviePage_II from "./component/MoviePage_II";
import New from "./component/New";
import { Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import React, { Component } from "react";

export default class App extends Component {
    state = {
        movies: [],
    };
    deleteEntry = (id) => {
        let filtereMovies = this.state.movies.filter((movieObj) => {
            return movieObj._id != id;
        });
        this.setState({
            movies: filtereMovies,
        });
    };
    async componentDidMount() {
        // console.log(2);
        let resp = await fetch("https://react-backend101.herokuapp.com/movies");
        let jsonMovies = await resp.json();
        this.setState({
            movies: jsonMovies.movies,
        });
    }
    addMovie = (obj) => {
        let { title, genre, stock, rate } = obj;
        let genreObj = [
            { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
            { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
            { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
        ];
        for (let i = 0; i < genreObj.length; i++) {
            if (genreObj[i].name == genre) {
                genre = genreObj[i];
            }
        }
        let movieObj = {
            _id: Date.now(),
            title,
            genre,
            dailyRentalRate: rate,
            numberInStock: stock,
        };
        let copyOfMovies = [...this.state.movies, movieObj];
        this.setState({
            movies: copyOfMovies,
        });
    };
    render() {
        return (
            <>
                <Navbar></Navbar>
                <Switch>
                    <Route
                        path="/new"
                        render={(props) => {
                            return (
                                <New {...props} addMovie={this.addMovie}></New>
                            );
                        }}
                    ></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route
                        path="/"
                        exact
                        render={(props) => {
                            return (
                                <MoviePage_II
                                    {...props}
                                    deleteEntry={this.deleteEntry}
                                    movies={this.state.movies}
                                ></MoviePage_II>
                            );
                        }}
                    ></Route>
                </Switch>
            </>
        );
    }
}

// function App() {
//     return (
//         <>
//             <Navbar></Navbar>
//             <Switch>
//                 <Route path="/new" component={New}></Route>
//                 <Route path="/login" component={Login}></Route>
//                 <Route path="/" exact component={MoviePage_II}></Route>
//             </Switch>
//         </>
//         // <>
//         //     <MoviesPage></MoviesPage>,
//         //     <MoviePage_II></MoviePage_II>
//         // </>
//     );
// }
// export default App;
