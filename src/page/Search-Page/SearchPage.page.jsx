import React, { memo, useState } from "react";
import styled from "styled-components";
import MovieItem from "../../component/item/MovieItem/MovieItem.component";
import { connect } from "react-redux";
import {
  selectItemsByOption,
  selectItems,
} from "../../redux/store/store.selector";
import { selectSearchField } from "../../redux/search/search.selector";

const SearchPage = ({ items, match, allItems, searchField }) => {
  // const [searchItems,setSearchItems] = useState([])

  var arr = [];
  const currentPage = match.path.split("/")[1];
  const searchFieldParams = match.params.searchInfo;

  Object.keys(items).map((key) => {
    Object.keys(items[key]).map((item) => {
      arr.push(items[key][item]);
    });
  });
  arr = arr.filter(
    (item, index) => index === arr.findIndex((t) => t.id === item.id)
  );
  arr.sort(function (a, b) {
    if (currentPage === "movies") {
      return b.update.seconds - a.update.seconds;
    } else {
      return b.published.seconds - a.published.seconds;
    }
  });

  var searchItems = [];
  if (currentPage === "movies" && searchFieldParams.length > 0) {
    searchItems = arr.filter(
      (item) =>
        item.title.toLowerCase().includes(searchFieldParams.toLowerCase()) ||
        item.performer
          .toLowerCase()
          .includes(searchFieldParams.toLowerCase()) ||
        item.director.toLowerCase().includes(searchFieldParams.toLowerCase()) ||
        item.writer.toLowerCase().includes(searchFieldParams.toLowerCase()) ||
        item.producer.toLowerCase().includes(searchFieldParams.toLowerCase())
    );
  }
  if (currentPage === "books" && searchFieldParams.length > 0) {
    searchItems = arr.filter(
      (item) =>
        item.author.toLowerCase().includes(searchFieldParams.toLowerCase()) ||
        item.publisher
          .toLowerCase()
          .includes(searchFieldParams.toLowerCase()) ||
        item.title.toLowerCase().includes(searchFieldParams.toLowerCase())
    );
  }

  const history = match.path.split("/")[1];

  return (
    <div className="collection">
      <H1>Results for: {searchFieldParams}</H1>
      <Container classaName="movie-items">
        {searchItems.map((item) => {
          return <MovieItem item={item} />;
        })}
      </Container>
    </div>
  );
};

const H1 = styled.h1`
  display: inline-block;
  padding-top: 60px;
  font-family: Quicksand, sans-serif;
  font-size: 28px;
  font-weight: 400;
  padding-left: 60px;
  color: #414141;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const Container = styled.div.attrs((props) => ({
  className: props.classname,
}))`
  z-index: 1;
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 40px;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(6, minmax(0, 1fr));

  @media screen and (max-width: 800px) {
    padding-left: 15px;
    padding-top: 10px;
    padding-right: 15px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const mapStateToProps = (state, ownProps) => ({
  items: selectItemsByOption(ownProps.match.path.split("/")[1])(state),
  searchField: selectSearchField(state),
  allItems: selectItems(state),
});

export default memo(connect(mapStateToProps)(SearchPage));
