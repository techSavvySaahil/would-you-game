import React from "react";
import styled from "styled-components";

const ScoreCard = ({
  author,
  avatarURL,
  answeredQuestions,
  createdQuestions,
  isAuthorLoggedIn,
  score
}) => (
  <Wrapper className="row" isAuthorLoggedIn={isAuthorLoggedIn}>
    <ImageWrapper>
      <img src={avatarURL} alt="Author" style={{width:"50px", height: "50px"}} />
    </ImageWrapper>
    <QuestionsWrapper>
      <h3>{author}</h3>
      <p>Answered Questions: {answeredQuestions}</p>
      <p>Created Questions: {createdQuestions}</p>
    </QuestionsWrapper>
    <ScoreWrapper>
      <h3>Score</h3>
      <h1>{score}</h1>
    </ScoreWrapper>
  </Wrapper>
);

const Wrapper = styled.div`
  justify-content: space-evenly;
  margin: 5px;
  box-shadow: 0 0 5px black;
  border-radius: 5px;
  padding: 20px 0;

  ${props => props.isAuthorLoggedIn && `
    background-color: skyblue;
    color: white;
  `}
`;

const ImageWrapper = styled.div`
  border-right: 1px solid lightgray;
  width: 25%;
`;

const QuestionsWrapper = styled.div`
  width: 50%;
`;

const ScoreWrapper = styled.div`
  border-left: 1px solid lightgray;
  width: 25%;
`;

export default ScoreCard;
