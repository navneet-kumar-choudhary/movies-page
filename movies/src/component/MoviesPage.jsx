import React, { Component } from "react";
import { getMovies } from "../temp/MovieServices";
export default class MoviesPage extends Component {
    state = {
        movies: getMovies(),
        currSearchText: "",
    };
    // delete krta hai jb bhi delete button pe click krte hai
    deleteEntry = (id) => {
        let filteredMovies = this.state.movies.filter((movieObj) => {
            // yaha pe movieObject k catch krta jb map ke through call krte hai
            return movieObj._id !== id;
        });
        this.setState({ movies: filteredMovies });
    };

    setCurrentText = (e) => {
        let task = e.target.value;

        this.setState({
            currSearchText: task,
        });
    };
    render() {
        // console.log(this.state.movies);
        let { movies, currSearchText } = this.state;
        // yaha pe filter isliye kiye kyuki jb bhi set state call hoga
        // setcurrentText se toh filter karenge display using movies objects pe phir filtered movies show hoga
        let filteredArr = movies.filter((movieObj) => {
            // movies pe filter kr rhe hai
            let title = movieObj.title.trim().toLowerCase(); // movie object se title nikal ke lowercase me convert krenge or trim kr denge
            // console.log(title);
            return title.includes(currSearchText.toLowerCase());
        });
        if (currSearchText === "") {
            // agar empty ho search box me toh pura movies ko show krna hoga.
            filteredArr = this.state.movies;
        }

        return (
            <div className="row">
                {/* 12 part */}
                <div className="col-3"></div>
                <div className="col-9">
                    {/* default input from react documentation */}
                    <input
                        type="search"
                        value={currSearchText}
                        onChange={this.setCurrentText}
                    />
                    {/* from here bootstrap starts */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArr.map((movieObj) => {
                                return (
                                    <tr scope="row" key={movieObj._id}>
                                        <td>{movieObj.title}</td>
                                        <td>{movieObj.genre.name}</td>
                                        <td>{movieObj.numberInStock}</td>
                                        <td>{movieObj.dailyRentalRate}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    this.deleteEntry(
                                                        movieObj._id
                                                    );
                                                }} // delete hamesha movies object pe delete krega
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
