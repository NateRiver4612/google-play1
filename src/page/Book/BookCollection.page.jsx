import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BookItem from "../../component/item/BookItem/BookItem.component";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  selectMovieDetail,
  selectBooksByType,
  selectItems,
} from "../../redux/store/store.selector";
import CategoryCart from "../../component/category-bar/CategoryCart.component";
import { withRouter } from "react-router-dom";

const BookCollection = ({ books }) => {
  const arr = [];
  Object.keys(books).map((key) => {
    arr.push(books[key]);
  });

  arr.sort(function (a, b) {
    return b.published.seconds - a.published.seconds;
  });

  return (
    <Container>
      {arr.map((item) => {
        return <BookItem item={item} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  z-index: 1;
  padding-top: 130px;
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 40px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(6, minmax(0, 1fr));
`;

const mapStateToProps = (state, ownProps) => ({
  books: selectBooksByType(ownProps.match.params.collectionId)(state),
});

export default withRouter(connect(mapStateToProps)(BookCollection));
