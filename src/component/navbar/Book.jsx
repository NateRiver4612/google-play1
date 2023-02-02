import React from "react";
import { DetailWarrper } from "./navbar.component";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Book = ({ history }) => {
  return (
    <Container>
      <Link to="/books/mybooks">
        <DetailWarrper onClick={() => history.replace(`/books/mybooks`)}>
          <Span to="/books/mybooks">My Books</Span>
        </DetailWarrper>
      </Link>
    </Container>
  );
};

const Span = styled(Link)`
  text-decoration: none;
  color: #979797;
  font-size: 14px;
`;

const Container = styled.div``;

export default React.memo(withRouter(Book));
