import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {ScoreCard} from "../components";

class Leaderboard extends React.Component {
  state = {
    sortedUsers: []
  }

  componentDidMount () {
    this.sortUsers();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.users !== this.props.users)
      this.sortUsers();
  }

  sortUsers = () => {
    const {users} = this.props;
    if (!users || !Object.keys(users).length) {
      return null;
    }

    const sortedUsers = Object.values(users).sort((a,b) => {
      const {
        questions: questionsA,
        answers: answersA
      } = a;

      const {
        questions: questionsB,
        answers: answersB
      } = b;

      const totalForA = (questionsA.length + Object.keys(answersA).length);
      const totalForB = (questionsB.length + Object.keys(answersB).length);

      return totalForB - totalForA ;
    });

    this.setState({
      sortedUsers
    });
  }
  render () {
    const {sortedUsers} = this.state;
    const {loggedInUser} = this.props;

    if (!sortedUsers.length) {
      return null;
    }

    const scoreCardView = sortedUsers.map((user) => {
      const {
        name,
        avatarURL,
        answers,
        questions,
        id
      } = user;
      const isAuthorLoggedIn = id === loggedInUser.id;
      const answeredQuestions = Object.keys(answers).length;
      const createdQuestions = questions.length;
      const score = answeredQuestions + createdQuestions;

      return(
        <ScoreCard
          author={name}
          avatarURL={avatarURL}
          answeredQuestions={answeredQuestions}
          createdQuestions={createdQuestions}
          isAuthorLoggedIn={isAuthorLoggedIn}
          key={id}
          score={score}
        />
      )
    });

    return (
      <Wrapper>
        <Header>Leaderboard</Header>
        <BoardWrapper>
          {scoreCardView}
        </BoardWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 20px auto 0;
  width: 60%;
  max-width: 600px;
`;

const Header = styled.h3`
  margin-bottom: 40px;
`;

const BoardWrapper = styled.div`
`;

const mapStateToProps = (store) => {
  const {
    users,
    loggedInUser
  } = store;
  return {
    users,
    loggedInUser
  };
};

const withStore = connect(mapStateToProps);

export default withStore(Leaderboard);
