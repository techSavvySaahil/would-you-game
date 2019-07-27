import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {_saveQuestion} from "../utils/DB";
import {
  updateQuestions,
  updateLoggedInUser,
  updateUsers
} from "../ReducersActions/actions";
class CreateQuestion extends React.Component {
  state = {
    optionOne: "",
    optionTwo: ""
  }

  handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    this.setState({
      [name]: value
    });
  }

  createQuestion = () => {
    // update questions, users, loggedInUser, unAnsweredQuestions
    const {
      loggedInUser,
      updateQuestions,
      updateLoggedInUser,
      updateUsers,
      history
    } = this.props;
    const {
      optionOne,
      optionTwo
    } = this.state;
    const {id: userId} = loggedInUser;
    _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: userId
    })
      .then((response) => {
        const {id} = response;
        updateQuestions({
          id,
          object: response
        });
        loggedInUser.questions.push(id)
        updateLoggedInUser(loggedInUser);
        updateUsers({
          id: userId,
          object: loggedInUser
        });
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    const {
      optionOne,
      optionTwo
    } = this.state;
    return (
      <Wrapper>
        <div>
          <h3>Create Question</h3>
        </div>
        <QuestionWrapper>
          <h4>Would you rather..</h4>
          <input
            name="optionOne"
            placeholder="Option one"
            value={optionOne}
            onChange={this.handleChange}
          />
          <h3>Or</h3>
          <input
            name="optionTwo"
            placeholder="Option two"
            value={optionTwo}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-primary w-50 mt-4 py-2"
            disabled={!optionOne || !optionTwo}
            onClick={this.createQuestion}
          >
            Submit
          </button>
        </QuestionWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 20px auto;
  width: 60%;
  max-width: 600px;
`;

const QuestionWrapper = styled.div`
  box-shadow: 0 0 10px black;
  border-radius: 5px;
  padding: 20px;
  margin-top: 40px;
  input {
    width: 80%;
    margin: 20px auto;
    border: 0;
    padding: 3px 10px;
    box-shadow: 0 0 4px black;
    border-radius: 3px;
  }
`;

const mapStateToProps = (store) => {
  const {
    loggedInUser
  } = store;
  return {
    loggedInUser
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateQuestions: ({id, object}) => {
    dispatch(updateQuestions({id, object}));
  },
  updateLoggedInUser: (loggedInUser) => {
    dispatch(updateLoggedInUser(loggedInUser));
  },
  updateUsers: ({id, object}) => {
    dispatch(updateUsers({id, object}));
  }
});

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withRouter(withStore(CreateQuestion));
