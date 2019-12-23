import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'

import P5 from './wrappers/P5Wrapper'

import Random from './pages/random/Random'
import White from './pages/white/White'
import Perlin from './pages/perlin/Perlin'
import Flow from './pages/flow/Flow'

function App() {

  const urlPrefix = '/png5'

  useEffect(() => {
      M.AutoInit()
  }, [])
  const links = [
    {to: "/random", name: "Random"},
    {to: "/white-noise", name: "White Noise"},
    // {to: "/pink-noise", name: "Pink Noise"},
    // {to: "/simplex-noise", name: "Simplex Noise"},
    {to: "/perlin-noise", name: "Perlin Noise"},
    // {to: "/brownian-noise", name: "Brownian Noise"},

    // {to: "/diamond-square", name: "Diamond square"},
    // {to: "/power-law-noise", name: "Power-law noise"},
    // {to: "/uber-noise", name: "Uber noise"},

    {to: "/flow-field", name: "Flow field"},
    // {to: "/cellular-noise", name: "Cellular Noise"},
  ]

  function getNavLinks() {
    return links.map((link, linkIndex) => (
      <li key={linkIndex}>
        <Link to={urlPrefix + link.to}>{link.name}</Link>
      </li>
    ))
  }

  return (
    <Router>
      <div className="App">

        <header>

          <nav className="nav-extended">
            <div className="nav-wrapper">
              <Link to={urlPrefix + "/"} className="brand-logo right"><i className="material-icons">cloud</i>png5</Link>
              <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>

              <ul id="nav-mobile" className="left hide-on-med-and-down">
                {getNavLinks()}
              </ul>
            </div>

            {/* <div className="nav-content">
              <span className="nav-title">Title</span>
            </div> */}
          </nav>

          <ul className="sidenav" id="mobile-demo">
            {getNavLinks()}
          </ul>

        </header>

        <Switch>
          <Route path={urlPrefix + "/random"}>
            <Random />
          </Route>
          <Route path={urlPrefix + "/white-noise"}>
            <White />
          </Route>
          <Route path={urlPrefix + "/pink-noise"}>
            <h1>Pink Noise</h1>
          </Route>
          <Route path={urlPrefix + "/simplex-noise"}>
            <h1>Simplex Noise</h1>
          </Route>
          <Route path={urlPrefix + "/perlin-noise"}>
            <Perlin />
          </Route>
          <Route path={urlPrefix + "/brownian-noise"}>
            <h1>Brownian Noise</h1>
          </Route>

          <Route path={urlPrefix + "/diamond-square"}>
            <h1>Diamond square</h1>
          </Route>
          <Route path={urlPrefix + "/power-law-noise"}>
            <h1>Power-law noise</h1>
          </Route>
          <Route path={urlPrefix + "/uber-noise"}>
            <h1>Uber noise</h1>
          </Route>

          <Route path={urlPrefix + "/flow-field"}>
            <Flow />
          </Route>
          <Route path={urlPrefix + "/cellular-noise"}>
            <h1>Cellular Noise</h1>
          </Route>

          <Route path={"/" || urlPrefix}>
            <h1>Welcome</h1>
          </Route>
          
          <Route path={urlPrefix + "/*"}>
            404
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
