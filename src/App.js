import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Component/header/Header";
import Menu from "./Component/Menu/Menu";
import Items from "./Component/Items/Items";
import Stats from "./Component/Stats/Stats";
import Settings from "./Component/Settings/Settings";
import AddItem from "./Component/AddItem/AddItem";
import "./App.css";

class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      data: [],
      selectList: []
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleSelectListForm = this.handleSelectListForm.bind(this)
  }

  handleFormSubmit(newdata)
  {
    let storeddata = this.state.data.slice();
    storeddata.push(newdata);
    storeddata.sort((a, b) =>
    {
      const aDate = new Date(a.lahetyspaiva);
      const bDate = new Date(b.lahetyspaiva);
      return bDate.getTime() - aDate.getTime();
    });
    this.setState({
      data: storeddata
    });
  }

  addData = data =>
  {
    console.log(this.state.data)
    this.setState({
      data: this.state.data.concat(data)
    });
  };

  handleSelectListForm(newItem)
  {
    if(this.state.selectList.indexOf(newItem) === -1) {
      this.setState({
        selectList: this.state.selectList.concat(newItem)
      });
    }
  }

  render()
  {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route
            path="/"
            exact
            render={() => <Items data={this.state.data} />}
          />
          <Route path="/stats" render={() => <Stats data={this.state.data} />} />
          <Route path="/settings" render={() =>
            <Settings selectList={this.state.selectList} onFormSubmit={this.handleSelectListForm} />} />

          <Route
            path="/add"
            render={() => <AddItem onFormSubmit={this.addData} selectList={this.state.selectList} />}
          />
          <Menu />
        </div>
      </Router>
    );
  }
}

export default App;
