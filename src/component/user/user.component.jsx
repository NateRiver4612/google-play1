import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { BsFillStarFill } from "react-icons/bs";
export const User = ({ userComment }) => {
  var { comment, value, displayName, photoURL, option, itemID, date } =
    userComment;
  if (!displayName) {
    displayName = "Google-play user";
  }
  const DateString = date.split(",");
  const Date = `${DateString[1]} ${DateString[2]}, ${DateString[3]}`;
  return (
    <Container>
      <Wrap className="user-img">
        <Ava src={photoURL} />
      </Wrap>
      <Wrap className="user-info">
        <Span className="user-name">{displayName}</Span>
        <Span className="user-rate">
          {Array.from(Array(5), (e, i) => {
            if (i < value) {
              return <Star key={i} className="rate"></Star>;
            } else {
              return <Star key={i}></Star>;
            }
          })}
          <Span className="comment-date">{Date}</Span>
        </Span>
        <Span className="user-comment">{comment}</Span>
      </Wrap>
    </Container>
  );
};

const Star = styled(BsFillStarFill)`
  font-size: 10px;
  color: #e0e0e0;
  padding-right: 5px;

  &.rate {
    color: #ffb400;
  }
`;

const Span = styled.span.attrs((props) => ({
  className: props.classname,
}))`
  width: 100%;

  &.comment-date {
    font-size: 11px;
    opacity: 0.6;
    font-weight: 500;
  }

  &.user-name {
    font-size: 13px;
    font-weight: 500;
    opacity: 0.9;
  }

  &.user-rate {
    display: inline-block;
    width: 100%;
    justify-content: space-between;
  }

  &.user-comment {
    font-size: 14px;
    opacity: 0.7;
  }
`;

const Ava = styled(Avatar)`
  width: 47px !important;
  height: 47px !important;
`;

const Wrap = styled.div.attrs((props) => ({
  className: props.classname,
}))`
  &.user-img {
    flex: 0.1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.user-info {
    flex: 0.9;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
`;

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(User);
