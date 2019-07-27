import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {
  updateLoggedInUser
} from "../ReducersActions/actions";
import {withRouter} from "react-router-dom";
class Login extends React.Component {
  state = {
    selectedUser: null
  }

  selectUser = (selectedUser) => {
    this.setState({
      selectedUser
    });
  }

  setLoggedInUser = () => {
    const {
      setLoggedInUser,
      history
    } = this.props;
    const {selectedUser} = this.state;
    setLoggedInUser(selectedUser)
    history.push("/home");
  }

  render () {
    const {users} = this.props;
    const {selectedUser} = this.state;
    const usersView = Object.values(users).map((user) => (
        <a
          key={user.id}
          className="dropdown-item"
          onClick={() => this.selectUser(user)}
        >
          {user.name}
        </a>
    ));

    const buttonText = selectedUser ? selectedUser.name : "Log in as";

    return (
      <Wrapper className="dropdown">
        <div className="bg-light text-dark p-3">
          <h3>Welcome to the Would You Rather game !</h3>
          <p>Please sign in to continue</p>
        </div>
        <div className="p-4">
          <h2>Sign In</h2>
          <button className="btn btn-primary dropdown-toggle w-100 mt-5 mb-2" data-toggle="dropdown">
            {buttonText}
          </button>
          <div className="dropdown-menu w-75">
            {usersView}
          </div>
          <br />
          <button
            className="btn btn-secondary mt-3"
            onClick={this.setLoggedInUser}
            disabled={!selectedUser}
          >
            Sign In
          </button>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 70%;
  margin: 50px auto;
  max-width: 700px;
  box-shadow: 0 0 10px black;
  a {
    cursor: pointer;
  }
`;

const mapStateToProps = (store) => {
  const {users} = store;
  return {
    users
  }
};

const mapDispatchToProps = (dispatch) => ({
  setLoggedInUser: (loggedInUser) => {
    dispatch(updateLoggedInUser(loggedInUser));
  }
});

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(withStore(Login));
