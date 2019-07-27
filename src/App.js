import React from 'react';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import {connect} from "react-redux";
import {
  _getQuestions,
  _getUsers
} from "./utils/DB";
import {
  Home,
  Leaderboard,
  CreateQuestion,
  Login,
  Question
} from "./pages";
import {
  setUsers,
  updateLoggedInUser,
  setQuestions
} from "./ReducersActions/actions";
import "./App.css";

class App extends React.Component {
  componentDidMount () {
    this.getQuestions();
    this.getUsers();
    const {
      loggedInUser
    } = this.props;
    const {pathname} = window.location;
    if (!Object.keys(loggedInUser).length && pathname !== "/login") {
      window.location.href = "/login";
    }
  }

  getQuestions = () => {
    const {setQuestions} = this.props;
    _getQuestions()
      .then((data) => {
        setQuestions(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  clearLoggedInUser = () => {
    const {updateLoggedInUser} = this.props;
    updateLoggedInUser({});
  }

  getUsers = () => {
    const {setUsers} = this.props;
    _getUsers()
    .then((data) => {
      setUsers(data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render () {
    const {
      loggedInUser
    } = this.props;
    return (
      <div className="App">
        <Router>
          {!!loggedInUser.name &&
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
              <ul className="navbar-nav w-100">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-question">Create Question</Link>
                </li>
                <li className="nav-item float-right ml-auto">
                  <Link className="nav-link" to="/home">Hello, {loggedInUser.name}</Link>
                </li>
                <li className="nav-item float-right">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={this.clearLoggedInUser}
                  >Logout</Link>
                </li>
              </ul>
            </nav>
          }
          <Switch>
            <Route exact component={Login} path="/login" />
            <Route exact component={Home} path="/home" />
            <Route exact component={Leaderboard} path="/leaderboard" />
            <Route exact component={CreateQuestion} path="/create-question" />
            <Route exact component={Question} path="/questions/:questionId" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  const {loggedInUser} = store;
  return {
    loggedInUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (questions) => {
      dispatch(setUsers(questions));
    },
    updateLoggedInUser: (questions) => {
      dispatch(updateLoggedInUser(questions));
    },
    setQuestions: (questions) => {
      dispatch(setQuestions(questions));
    }
  }
};

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(App);
