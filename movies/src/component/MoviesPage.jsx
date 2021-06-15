import React, { Component } from "react";
import { getMovies } from "../temp/MovieServices";
export default class MoviesPage extends Component {
    state = {
        movies: [],
        genres: [{ id: 1, name: "All Genres" }],
        currSearchText: "",
        limit: 4,
        currentPage: 1,
        cGenres: "All Genres",
    };
    // delete krta hai jb bhi delete button pe click krte hai
    deleteEntry = (id) => {
        let filteredMovies = this.state.movies.filter((movieObj) => {
            // yaha pe movieObject k catch krta jb map ke through call krte hai
            return movieObj._id !== id;
        });
        this.setState({ movies: filteredMovies });
    };
    // It takes input from keyboard and then search in movie lists
    setCurrentText = (e) => {
        let task = e.target.value; // default syntax for taking input in react.

        this.setState({
            currSearchText: task,
        });
    };

    sortByRating = (e) => {
        let className = e.target.className.trim(); // this gives us class element so that we can use it
        let sortedMoviess;
        let { movies } = this.state;
        if (className == "fas fa-arrow-up") {
            sortedMoviess = movies.sort((movieObjA, movieObjB) => {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
            });
        } else {
            sortedMoviess = movies.sort((movieObjA, movieObjB) => {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
            });
        }
        this.setState({
            movies: sortedMoviess,
        });
    };

    sortByStock = (e) => {
        let className = e.target.className.trim(); // this gives us class element so that we can use it
        let sortedMoviess;
        let { movies } = this.state;
        if (className == "fas fa-arrow-up") {
            sortedMoviess = movies.sort((movieObjA, movieObjB) => {
                return (
                    movieObjA.numberInStock - movieObjB.numberInStock // sort by ascending order
                );
            });
        } else {
            sortedMoviess = movies.sort((movieObjA, movieObjB) => {
                return (
                    movieObjB.numberInStock - movieObjA.numberInStock // sort by descending order
                );
            });
        }
        this.setState({
            movies: sortedMoviess,
        });
    };
    changelimit = (e) => {
        // console.log("hello");
        let currLimit = e.target.value;
        if (currLimit < 1) return;
        // console.log(currPage);
        this.setState({
            limit: currLimit,
        });
    };
    changeCurrentPage = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        });
    };
    async componentDidMount() {
        // console.log(2);
        let resp = await fetch("https://react-backend101.herokuapp.com/movies");
        let jsonMovies = await resp.json();
        this.setState({
            movies: jsonMovies.movies,
        });
        resp = await fetch("https://react-backend101.herokuapp.com/genres");
        let jsonGenres = await resp.json();
        this.setState({
            genres: [...this.state.genres, ...jsonGenres.genres],
        });
    }
    render() {
        // console.log(this.state.movies);
        let { movies, currSearchText, limit, currentPage, genres } = this.state;
        // yaha pe filter isliye kiye kyuki jb bhi set state call hoga
        // setcurrentText se toh filter karenge display using movies objects pe phir filtered movies show hoga
        let filteredArr = movies.filter((movieObj) => {
            // movies pe filter kr rhe hai
            let title = movieObj.title.trim().toLowerCase(); // movie object se title nikal ke lowercase me convert krenge or trim kr denge

            return title.includes(currSearchText.trim().toLowerCase()); // If the input in search box match from the title in movies given then it returns true.
        });
        if (currSearchText === "") {
            // agar empty ho search box me toh pura movies ko show krna hoga.
            filteredArr = movies;
        }
        // pagination ke liye numberOfPage nikalye, pageNumberArr and filteredArr.
        let numberofPage = Math.ceil(filteredArr.length / limit); // total number of pages -> math.ceil always give greater elemnet than actual number
        let pageNumberArr = []; // pagenumberarr mein number of page stored ho jaega array ke form me.
        for (let i = 0; i < numberofPage; i++) {
            pageNumberArr.push(i + 1);
        }
        //implementation of pagination.
        let si = (currentPage - 1) * limit; // Starting index of array
        let eindx = si + limit; // ending index of array in one page.
        filteredArr = filteredArr.slice(si, eindx); //ye filtered array pe slice krke usko phir ek array me stored kr lega.

        return (
            <div className="row">
                {/* 12 part */}
                <div className="col-3">
                    <ul class="list-group">
                        {genres.map((cgObj) => {
                            return (
                                <li class="list-group-item" key={cgObj.id}>
                                    {cgObj.name}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="col-9">
                    {/* default input from react documentation */}
                    <input
                        type="search"
                        value={currSearchText}
                        onChange={this.setCurrentText}
                    />
                    <input
                        type="number"
                        className="col-1"
                        placeholder="no of elements/page"
                        value={limit}
                        onChange={this.changelimit}
                    />
                    {/* <input type="text" className="pageNumber"
                        placeholder="page number" /> */}

                    {/* from here bootstrap starts */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                {/* Sorting on the basis of stock */}
                                <th scope="col">
                                    <i
                                        className="fas fa-arrow-up"
                                        onClick={this.sortByStock}
                                    ></i>
                                    Stock
                                    <i
                                        className="fas fa-arrow-down"
                                        onClick={this.sortByStock}
                                    ></i>
                                </th>
                                {/* Sorting on the basis of rating  */}
                                <th scope="col">
                                    <i
                                        className="fas fa-arrow-up"
                                        onClick={this.sortByRating}
                                    ></i>
                                    Rate
                                    <i
                                        className="fas fa-arrow-down"
                                        onClick={this.sortByRating}
                                    ></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredArr.map((movieObj) => {
                                return (
                                    <tr scope="row" key={movieObj._id}>
                                        <td></td>
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
                    {/* pagination code taken from bootstrap */}
                    <nav aria-label="..." className="col-2">
                        <ul className="pagination ">
                            {pageNumberArr.map((pageNumber) => {  // upar se pageNumberArr me element lake map kr rha hai.
                                return (
                                    <li
                                        className="page-item active"
                                        aria-current="page"
                                    >
                                        <span className="page-link">
                                            {pageNumber}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
