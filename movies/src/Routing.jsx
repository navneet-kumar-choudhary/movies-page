// Routing -> mein client request krta hai server pe like linkedIn jb onpe krega toh linked khulega
// Jab bhi server pe request krega toh waha se response ayega or response me linkedIn ka (shuruat mein) framework
// ya components aa jaega jaise feeds, jobs, etc or data baad me aayega isiko routing kehte hai.
// npm i react-router-dom to instal router in react.

import React, { Component } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";

export default class Routing extends Component {
    render() {
        return (
            <div>
                Routing Example
                {/* Link component kabhi bhi page ko relode nhi one jaise ki anchor tag kr dete hai. */}
                {/* UI for render not to relode the page */}
                <ul>
                    <li>
                        <Link to="/home/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/listing">Listing</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                </ul>
                {/* Switch ek component hai -> Switch tb use karenge jb N number of Route hai or unmese ek hi implement krna hai toh switch use karenge */}
                {/* jb multiple route ho lihte hai page pe tb jo exact jo route ho wo chale uske liye EXACT use hota hai */}
                {/* <Route path="/home/profile" exact component={Profile}></Route> */}
                {/* path-> / ->Home */}
                {/* <Route path="/home" exact component={Home}></Route> */}
                {/* jb bhi website pe jake /home agar kiya toh home component print ho jana chahiye */}
                {/* <Route path="/profile" component={Profile}></Route> */}
                {/* /profile -> profile */}
                {/* /listing -> listing */}
                {/* /home -> home */}
                {/* not a match -> error */}
                {/* route -> pathi is a subset route will match */}
                {/* Switch -> every route that i have i will render only one of them */}
                
                {/* logic to route the page address */}
                <Switch>
                    <Route path="/home/profile" component={Profile}></Route>
                    <Route path="/listing" exact component={Listing}></Route>
                    <Route path="/home" exact component={Home}></Route>
                    <Redirect from="/home" to="/"></Redirect>
                    <Route path="/" exact component={Home}></Route>
                    <Route component={Error}></Route>
                </Switch>
            </div>
        );
    }
}

class Home extends Component {
    render() {
        return <div>Home</div>;
    }
}

class Profile extends Component {
    render() {
        return <div>Profile</div>;
    }
}

class Listing extends Component {
    render() {
        return <div>Listing</div>;
    }
}

class Error extends Component {
    render() {
        return <div>Error</div>;
    }
}
