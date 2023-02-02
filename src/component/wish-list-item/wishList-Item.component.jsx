import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { withRouter } from "react-router";
import { selectCurrentItemStart } from "../../redux/Item/item.action";
import { connect } from "react-redux";
import { toggleList } from "../../redux/wish-list/wishList.action";

const WishListItem = ({
  selectCurrentItemStart,
  toggleList,
  doc,
  history,
  item,
}) => {
  var md5 = require("md5");
  const { title, imgUrl, type, id, rate, price } = item;
  const oneType = type.includes(",") ? type.substr(0, type.indexOf(",")) : type;
  return (
    <Container
      onClick={() => {
        history.replace(`/${doc}/details/${title}${md5(id)}`);
        selectCurrentItemStart(id, type);
        toggleList();
      }}
    >
      <Wrap className="relate-img">
        <img src={imgUrl} />
      </Wrap>

      <Wrap className="relate-info">
        <Span
          className="relate-title"
          onClick={() => {
            history.replace(`/${doc}/details/${title}${md5(id)}`);
            selectCurrentItemStart(id, type);
          }}
        >
          {title.length > 16 ? `${title.substr(0, 29)}` : title}
        </Span>
        <Span className="relate-type">
          <Link to={`/${doc}/category/${oneType}`}>{oneType}</Link>
        </Span>
        <Wrap className="relate-price-rate">
          <Wrap className="relate-rate">
            {Array.from(Array(rate), (e, i) => {
              return <StarIcon></StarIcon>;
            })}
          </Wrap>
          <Span className="relate-price">
            {price}.000 <span style={{ textDecoration: "underline" }}>đ</span>
          </Span>
        </Wrap>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  height: 110px;
  margin-top: 15px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  background-color: #ffffff;

  &:hover {
    img {
      -webkit-filter: brightness(70%);
    }
  }
`;

const StarIcon = styled(AiFillStar)`
  color: #737373;
  font-size: 10px;
`;

const Wrap = styled.div.attrs((props) => ({
  className: props.classname,
}))`
  &.relate-img {
    flex: 0.3;
    img {
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      width: 80px;
      height: 110px;

      &:hover {
        -webkit-filter: brightness(70%);
      }
    }
  }

  &.relate-info {
    flex: 0.7;
    box-sizing: border-box;
    padding: 10px;
  }
  &.relate-price-rate {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Span = styled.div.attrs((props) => ({
  className: props.classname,
}))`
  &.relate-title {
    font-size: 16px;
    font-family: "Quicksand", sans-serif;
    opacity: 0.8;
    color: black;
    position: relative;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  &.relate-title::after {
    content: "";
    position: absolute;
    height: 100%;
    right: 0px;
    top: 0px;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 75%
    );
    width: 55px;
  }
  &.relate-description {
    font-size: 13px;
    padding-top: 10px;
    position: relative;
    cursor: pointer;
    opacity: 0.8;
    font-weight: 400;
  }
  &.relate-description:after {
    content: "";
    position: absolute;
    height: 100%;
    right: 0px;
    top: 0px;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 75%
    );
    width: 50px;
  }

  &.relate-type {
    font-size: 12px;
    padding-top: 0px;
    cursor: pointer;
    a {
      text-decoration: none;
      color: #898989;
    }
    &:hover {
      text-decoration: underline;
    }
  }
  &.relate-price {
    color: red;
    font-size: 14px;
    -webkit-filter: brightness(70%);
  }
`;

const mapDispatchToProps = (dispatch) => ({
  selectCurrentItemStart: (id, type) =>
    dispatch(selectCurrentItemStart({ id, type })),
  toggleList: () => dispatch(toggleList()),
});

export default React.memo(
  withRouter(connect(null, mapDispatchToProps)(WishListItem))
);
