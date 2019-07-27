import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {QuestionCard} from  "../components";
import {
  updateQuestions,
  updateLoggedInUser,
  updateUsers
} from "../ReducersActions/actions";
class Question extends React.Component {
  state = {
    showAnswerView: false,
    question: {}
  }
  componentDidMount () {
    this.checkQuestionType();
  }

  componentDidUpdate (prevProps) {
    if(prevProps.questions !== this.props.questions) {
      this.checkQuestionType();
    }
  }

  checkQuestionType () {
    const {
      loggedInUser,
      match,
      questions
    } = this.props;
    const {questionId: id} = match.params;
    const question = questions[id];
    if (question) {
      const {
        optionOne,
        optionTwo
      } = question;
      const optionOneVotes = optionOne.votes.length;
      const optionTwoVotes = optionTwo.votes.length;
      const totalVotes = optionOneVotes + optionTwoVotes;
      let optionOnePercentage = !!totalVotes ? (optionOneVotes/totalVotes)*100 : 0;
      let optionTwoPercentage = !!totalVotes ? (optionTwoVotes/totalVotes)*100 : 0;
      optionOnePercentage = optionOnePercentage.toFixed(2);
      optionTwoPercentage = optionTwoPercentage.toFixed(2);
      const userChosen = loggedInUser.answers[id];
      this.setState({
        question: question,
        editAnswerView: loggedInUser.answers[id] ? false : true,
        optionOnePercentage,
        optionTwoPercentage,
        optionOneVotes,
        optionTwoVotes,
        totalVotes,
        userChosen
      });
    }
  }

  submitAnswer = (selectedAnswer) => {
    const {
      loggedInUser,
      updateQuestions,
      updateLoggedInUser,
      updateUsers
    } = this.props;
    const {id: userId} = loggedInUser;
    const {question} = this.state;
    const {id} = question;
    question[selectedAnswer].votes.push(userId);
    loggedInUser.answers[id] = selectedAnswer;
    //update questions, loggedInUser, users
    updateQuestions({
      id,
      object: question
    });
    updateLoggedInUser(loggedInUser);
    updateUsers({
      id: userId,
      object: loggedInUser
    });
    this.checkQuestionType();
  }

  render () {
    const {
      question,
      editAnswerView,
      optionOnePercentage,
      optionTwoPercentage,
      optionOneVotes,
      optionTwoVotes,
      userChosen,
      totalVotes
    } = this.state;

    const {
      id,
      author,
      optionOne,
      optionTwo
    } = question;

    if (!totalVotes) {
      return (
        <div>404 - No poll found for this question</div>
      )
    }

    return (
      <Wrapper>
        <QuestionCard
          isEditing={editAnswerView}
          id={id}
          author={author}
          optionOne={optionOne}
          optionTwo={optionTwo}
          submitAnswer={this.submitAnswer}
          optionOnePercentage={optionOnePercentage}
          optionTwoPercentage={optionTwoPercentage}
          optionOneVotes={optionOneVotes}
          optionTwoVotes={optionTwoVotes}
          totalVotes={totalVotes}
          userChosen={userChosen}
        />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin: 50px auto 0;
  width: 60%;
  max-width: 600px;
`;

const mapStateToProps = (store) => {
  const {
    loggedInUser,
    questions
  } = store;
  return {
    loggedInUser,
    questions
  }
};

const mapDispatchToProps = (dispatch) => ({
  updateQuestions: ({
    id,
    object
  }) => {
    dispatch(updateQuestions({
      id,
      object
    }));
  },
  updateLoggedInUser: (loggedInUser) => {
    dispatch(updateLoggedInUser(loggedInUser));
  },
  updateUsers: ({
    id,
    object
  }) => {
    dispatch(updateUsers({
      id,
      object
    }));
  }
})

const withStore = connect(mapStateToProps, mapDispatchToProps);

export default withStore(Question);
