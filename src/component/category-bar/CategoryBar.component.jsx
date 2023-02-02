import React from "react";
import styled from "styled-components";
import { MdExpandMore } from "react-icons/md";
import { Link, withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import { selectCurrentCart } from "../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import { useState, useEffect } from "react";

const CategoryBar = ({
  history,
  toggleCartHidden,
  empty,
  currentCart,
  homeLink,
  hidden,
  setHidden,
}) => {
  const [currentColor, setCurrentColor] = useState("");
  const currentOption = history.location.pathname.split("/");

  useEffect(() => {
    if (currentOption[1] == "movies") {
      setCurrentColor("#ed3b3b");
    } else if (currentOption[1] == "books") {
      setCurrentColor("#039be5");
    } else if (currentOption[1] == "applications") {
      setCurrentColor("#689f38");
    }
  }, [currentOption]);

  return (
    <Container>
      <Wrap
        style={{ visibility: `${empty ? "hidden" : ""}` }}
        className="Category"
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        {currentCart.trim()}
        <ExpandIcon />
      </Wrap>

      <Span style={{ visibility: `${empty ? "hidden" : ""}` }}></Span>

      <Link to={homeLink} style={{ visibility: `${empty ? "hidden" : ""}` }}>
        <Wrap
          className="HomePage"
          style={{
            borderBottom: ` ${currentOption.length < 3 ? "3px" : "0px"} ${
              currentOption.length < 3 ? currentColor : "white"
            } solid`,
          }}
        >
          <Link id="home-link" to={homeLink}>
            Home page
          </Link>
        </Wrap>
      </Link>

      <Link
        to={`${homeLink}/top`}
        style={{ visibility: `${empty ? "hidden" : ""}` }}
      >
        <Wrap
          className="Charts"
          style={{
            borderBottom: ` ${
              currentOption.includes("top") ? "3px" : "0px"
            }   ${
              currentOption.includes("top") ? currentColor : "white"
            } solid`,
          }}
        >
          Charts
        </Wrap>
      </Link>

      <Link
        to={`${homeLink}/new`}
        style={{ visibility: `${empty ? "hidden" : ""}` }}
      >
        <Wrap
          className="New"
          style={{
            borderBottom: ` ${currentOption.includes("new") ? "3px" : "0px"}  ${
              currentOption.includes("new") ? currentColor : "white"
            } solid`,
          }}
        >
          New release
        </Wrap>
      </Link>
    </Container>
  );
};

const Span = styled.div`
  height: 30px;
  border-radius: 5px;
  border: #7f7f7f solid 1px;
  width: 0px;
  margin-left: 4px;
  opacity: 0.5;
`;

const ExpandIcon = styled(MdExpandMore)`
  margin-top: 4px;
  font-size: 23px;
  font-weight: 900;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`;

const Wrap = styled.div.attrs((props) => ({
  className: props.classname,
}))`
  display: flex;
  color: #8c8c8c;
  width: fit-content;
  flex: 0.1;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  justify-content: center;
  position: relative;
  cursor: pointer;
  height: 49px;
  padding-right: 15px;
  padding-top: 13px;
  padding-left: 15px;
  a {
    text-decoration: none;
    color: #8c8c8c;
  }
  &.Category {
    padding-left: 20px;
    padding-top: unset;
    align-items: center;
  }
  &.HomePage {
    margin-left: 15px;
    text-align: center;
    &:focus {
      /* border-bottom: #ed3b3b 3px solid; */
      box-sizing: border-box;
    }
  }

  &:after {
    position: absolute;
    border-bottom: 3px red solid;
  }

  &:hover {
    svg {
      color: black;
      font-size: 24px;
    }
    background-color: #eeeeee;
  }
`;
const Container = styled.div`
  background-color: #ffffff;
  min-height: 49px;
  width: 100%;
  position: fixed !important;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  z-index: 4;
  a {
    text-decoration: none;
    margin-left: 3px;
  }
`;

const mapStateToProps = createStructuredSelector({
  currentCart: selectCurrentCart,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryBar)
);
