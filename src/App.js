import "./App.css";
import NavBar from "./components/navbar";
import News from "./components/news.js";

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0
    };
  }
  pageSize="6"

  setProgress= (Progress)=>{
    setTimeout((Progress)=>{
      this.setState({progress:Progress})
    }, 1000);
  }

  render() {
    return (
      <div>
        <Router>
            <LoadingBar
            color='#f11946'
            height="50"
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <NavBar></NavBar>
          <Switch>
            <Route exact path="/entertainment">
              <News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"></News>
            </Route> 
            <Route exact path="/health">
              <News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health"></News>
            </Route>
            <Route exact path="/sports">
              <News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports"></News>
            </Route>
            <Route exact path="/technology">
              <News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology"></News>
            </Route>
            <Route exact path="/science">
              <News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science"></News>
            </Route>
            <Route exact path="/">
              <News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"></News>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
