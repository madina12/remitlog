import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Component/header/Header';
import Menu from './Component/Menu/Menu';
import Items from './Component/Items/Items';
import Stats from './Component/Stats/Stats';
import Settings from './Component/Settings/Settings';
import testdata from './testdata';
import AddItem from './Component/AddItem/AddItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: testdata,
    };
  }

  addData = data => {
    this.setState({
      data: testdata.concat(data),
    });
  };
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route
            path="/"
            exact
            render={() => <Items data={this.state.data} />}
          />
          <Route path="/stats" component={Stats} />
          <Route path="/settings" component={Settings} />
          <Route
            path="/add"
            render={() => <AddItem onFormSubmit={this.addData} />}
          />
          <Menu />
        </div>
      </Router>
    );
  }
}

export default App;
