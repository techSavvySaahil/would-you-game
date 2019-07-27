import React from "react";
import styled from  "styled-components";
import {connect} from "react-redux";
import {QuestionCard} from "../components";

class Home extends React.Component {
  state = {
    showAnsweredQuestions: false,
    answeredQuestions: {},
    unAnsweredQuestions: {}
  }
  componentDidMount () {
    this.checkQuestions();
  }

  toggleTabs = (showAnswered) => {
    this.setState({
      showAnsweredQuestions: showAnswered
    });
  }

  checkQuestions = () => {
    const {
      questions,
      loggedInUser
    } = this.props;
    let answeredQuestions = {};
    let unAnsweredQuestions = {};
    // keys sort
    // sortedkeys
    const sortedKeys = Object.keys(questions).sort((a,b) => {
      return questions[b].timestamp - questions[a].timestamp;
    });
    sortedKeys.forEach(key => {
      if (loggedInUser.answers[key]) {
        answeredQuestions[key] = Object.assign({}, questions[key]);
      }
      else {
        unAnsweredQuestions[key] = Object.assign({}, questions[key]);
      }
    });
    this.setState({
      answeredQuestions,
      unAnsweredQuestions
    });
  }

  render () {
    const {
      answeredQuestions,
      unAnsweredQuestions,
      showAnsweredQuestions
    } = this.state;

    if (!answeredQuestions && !unAnsweredQuestions) {
      return null;
    }

    const answeredQuestionsView = Object.values(answeredQuestions).map((question) => {
      const {
        author,
        id,
        optionOne,
        optionTwo
      } = question;
      return(
        <QuestionCard
          author={author}
          id={id}
          key={id}
          optionOne={optionOne}
          optionTwo={optionTwo}
          viewPoll="View Poll"
        />
      )
    });

    const unAnsweredQuestionsView = Object.values(unAnsweredQuestions).map((question) => {
      const {
        author,
        id,
        optionOne,
        optionTwo
      } = question;
      return(
        <QuestionCard
          author={author}
          id={id}
          key={id}
          optionOne={optionOne}
          optionTwo={optionTwo}
          viewPoll="Answer"
        />
      )
    });

    return (
      <Wrapper>
        <div>
          <nav className="navbar navbar-expand-sm bg-info navbar-light mt-3 pb-1">
            <ul className="navbar-nav w-100">
              <List className="nav-item w-50" active={!showAnsweredQuestions}>
                <button
                  className="btn text-white"
                  onClick={() => this.toggleTabs(false)}
                >
                  Unanswered Questions
                </button>
              </List>
              <List className="nav-item w-50" active={!!showAnsweredQuestions}>
                <button
                  className="btn text-white"
                  onClick={() => this.toggleTabs(true)}
                >
                  Answered Questions
                </button>
              </List>
            </ul>
          </nav>
        </div>
        <QuestionsWrapper>
          {!!showAnsweredQuestions && answeredQuestionsView}
          {!showAnsweredQuestions && unAnsweredQuestionsView}
        </QuestionsWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 50px auto 0;
  width: 60%;
  max-width: 600px;
`;

const QuestionsWrapper = styled.div`
  height: 70vh;
  overflow: auto;
`;

const List = styled.li`
  border-radius: 5px 5px 0 0;
  button {
    :focus {
      box-shadow: none;
    }
  }
  ${props => props.active && `
    background-color: gray;
    cursor: default;
    button {
      cursor: default;
    }
  `}
`;

const mapStateToProps = (store) => {
  const {
    questions,
    loggedInUser
  } = store;

  return {
    questions,
    loggedInUser
  };
};

const withStore = connect(mapStateToProps);

export default withStore(Home);
