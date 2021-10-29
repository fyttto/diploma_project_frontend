import React, { Fragment } from 'react';
import Login from './page/login';
import Home from './page/home';
// @ts-ignore
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Fragment>
        <HashRouter>
          <Switch>
            <Route path="/login" component={Login} onEnter={()=>{document.title="log in"}} />
            <Route path="/home" component={Home} onEnter={()=>{document.title="主页"}} />
            <Route exact path="/" component={Home} />
            <Redirect to={"/home"} />
          </Switch>
        </HashRouter>
      </Fragment>
    </div>
  )
}

export default App
