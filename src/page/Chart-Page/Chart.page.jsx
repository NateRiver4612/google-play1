import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import MovieItem from "../../component/item/MovieItem/MovieItem.component";
import { connect } from "react-redux";
import BookItem from "../../component/item/BookItem/BookItem.component";
import { selectItemsByOption } from "../../redux/store/store.selector";
import { selectBuyItems } from "../../redux/buy-list/BuyList.selector";

const ChartPage = ({ items, buyItems, match }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const date = new Date();

  const history = match?.url?.split("/")[1];

  const now = useMemo(() => {
    date.setMonth(date.getMonth() - 1);
    date.setHours(0, 0, 0, 0);

    return (date / 1000) | 0;
  }, [date]);

  const chart = match.params.chartId;

  useEffect(() => {
    var arr = [];

    Object.keys(items).map((key) => {
      Object.keys(items[key]).map((item) => {
        arr.push(items[key][item]);
      });
    });

    arr = arr.filter(
      (thing, index, self) =>
        index ===
        self.findIndex((t) => {
          return t.id === thing.id;
        })
    );

    arr.sort((a, b) => {
      if (history == "movies") {
        return b.update.seconds - a.update.seconds;
      } else if (history == "books") {
        return b.published.seconds - a.published.seconds;
      }
    });

    if (chart == "top") {
      setSelectedItems(arr.filter((item) => item.rate == 5));
    } else if (chart == "new") {
      if (history == "movies") {
        setSelectedItems(arr.filter((item) => item.update.seconds >= now));
      } else if (history == "books") {
        setSelectedItems(arr.filter((item) => item.published.seconds >= now));
      }
    } else if (chart == "mymovies" || chart == "mybooks") {
      if (history == "movies") {
        var movies = buyItems.filter((item) => item["doc"] == "movies");
        movies = movies.map((item) => item["item"]);
        setSelectedItems(movies);
      } else if (history == "books") {
        var books = buyItems.filter((item) => item["doc"] == "books");
        books = books.map((item) => item["item"]);
        setSelectedItems(books);
      }
    }
  }, [items, chart, buyItems]);

  return (
    <div className="collection">
      <H1>{chart}</H1>
      <Container classaName="movie-items">
        {selectedItems.map((item, index) => {
          if (history === "movies") {
            return <MovieItem key={index} item={item} />;
          }
          if (history === "books") {
            return <BookItem key={index} item={item} />;
          }
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
  text-transform: capitalize;

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
  items: selectItemsByOption(ownProps.match.url.split("/")[1])(state),
  buyItems: selectBuyItems(state),
});

export default connect(mapStateToProps)(ChartPage);
