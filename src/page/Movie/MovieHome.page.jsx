import React, { useMemo } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { selectMovies } from "../../redux/store/store.selector";
import { connect } from "react-redux";
import MovieItem from "../../component/item/MovieItem/MovieItem.component";
import { Link } from "react-router-dom";
const MovieHome = ({ movies, match }) => {
  const shuffleArray = (array) => {
    array = [...Object.keys(array).map((key) => array[key])];

    console.log(array);

    array.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.update.seconds) - new Date(a.update.seconds);
    });

    return array;
  };

  return (
    <Container>
      {Object.keys(movies).map((category, index) => (
        <div key={index} className="collection">
          <Link to={`${match.url}/category/${category}`}>
            <H1>{category}</H1>
          </Link>
          <Wrap classaName="movie-items">
            {shuffleArray(movies[category]).map((item, key) => {
              if (key <= 5) {
                return <MovieItem key={key} item={item} />;
              }
            })}
          </Wrap>
        </div>
      ))}
    </Container>
  );
};

const Wrap = styled.div.attrs((props) => ({
  className: props.classname,
}))`
  z-index: 1;
  padding-left: 60px;
  padding-right: 60px;
  padding-bottom: 0px;
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

const Container = styled.div`
  padding-bottom: 100px;
`;

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
const mapStateToProps = (state) => ({
  movies: selectMovies(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieHome)
);
