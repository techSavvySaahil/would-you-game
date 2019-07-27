import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import styled from "styled-components";

class QuestionCard extends React.Component {
  state = {
    selectedAnswer: ""
  }

  selectAnswer = (e) => {
    const {value} = e.target;
    this.setState({
      selectedAnswer: value
    });
  }

  submitAnswer = () => {
    const {selectedAnswer} = this.state;
    const {submitAnswer} = this.props;
    submitAnswer(selectedAnswer);
  }
  render () {
    const {
      id,
      isEditing,
      author,
      optionOne,
      optionTwo,
      users,
      viewPoll,
      optionOnePercentage,
      optionTwoPercentage,
      optionOneVotes,
      optionTwoVotes,
      totalVotes,
      userChosen
    } = this.props;

    if (!users || !users[author]) {
      return null;
    }

    const {
      avatarURL,
      name
    } = users[author];

    const {selectedAnswer} = this.state;

    return (
      <Wrapper>
        <NameWrapper>{name} asks: </NameWrapper>
        <QuestionWrapper>
          <div style={{width: "20%"}}>
            <img src={avatarURL} alt="" style={{width: "50px", height: "50px"}} />
          </div>
          <div style={{width: "60%"}}>
            <h4>Would you rather</h4>
            {!isEditing && !viewPoll &&
              <OptionsWrapper>
                <OptionWrapper chosen={userChosen==="optionOne"}>
                  <p>{optionOne.text}</p>
                  <p>{optionOnePercentage}% - {optionOneVotes} out of {totalVotes}</p>
                  {userChosen==="optionOne" && <Info>Your vote</Info>}
                </OptionWrapper>
                <br />
                <OptionWrapper chosen={userChosen==="optionTwo"}>
                  <p>{optionTwo.text}</p>
                  <p>{optionTwoPercentage}% - {optionTwoVotes} out of {totalVotes}</p>
                  {userChosen==="optionTwo" && <Info>Your vote</Info>}
                </OptionWrapper>
              </OptionsWrapper>
            }
            {!isEditing && !!viewPoll &&
              <OptionsWrapper>
                <p>{optionOne.text}</p>
                <p>Or</p>
                <p>{optionTwo.text}</p>
                <button
                  className="btn btn-primary w-100"
                >
                  <Link to={`/questions/${id}`}>
                    {viewPoll}
                  </Link>
                </button>
              </OptionsWrapper>
            }
            {!!isEditing &&
              <OptionsWrapper>
                <input
                  className="my-3"
                  type="radio"
                  name="answer"
                  value="optionOne"
                  onClick={this.selectAnswer}
                />&nbsp;{optionOne.text}
                <br />
                <input
                  className="my-3"
                  type="radio"
                  name="answer"
                  value="optionTwo"
                  onClick={this.selectAnswer}
                />&nbsp;{optionTwo.text}
                <br />
                <button
                  className="btn btn-primary w-100 mt-4 py-2"
                  disabled={!selectedAnswer}
                  onClick={this.submitAnswer}
                >
                  Submit
                </button>
              </OptionsWrapper>
            }
          </div>
        </QuestionWrapper>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin: 5px auto;
`;

const NameWrapper = styled.div`
  padding: 10px 20px;
  background-color: lightgray;
  text-align: left;
  border-radius: 5px 5px 0 0;
`;

const QuestionWrapper = styled.div`
  display: flex;
  padding: 2% 5%;
  border: 1px solid lightgray;
  text-align: left;
`;

const OptionsWrapper = styled.div`
  margin: 10px auto;
  button {
    margin: 10px 0;
    padding: 0;
  }
  p {
    margin: 5px 0;
  }
  a {
    color: white;
    padding: 0.375em 0.75em;
    display: block;
  }
`;

const OptionWrapper = styled.div`
  background-color: lightgrey;
  border-radius: 5px;
  padding: 10px;
  position: relative;
  ${props=> props.chosen && `
    background-color: skyblue;
  `}
`;

const Info = styled.span`
  position: absolute;
  top: 30%;
  right: -3%;
  width: 35px;
  height: 45px;
  font-size: 12px;
  background: #e88043;
  border-radius: 10px;
  padding: 5px;
  color: white;
`;

const mapStateToProps = (store) => {
  const {
    users
  } = store;

  return {
    users
  };
};

const withStore = connect(mapStateToProps);

export default withStore(QuestionCard);
