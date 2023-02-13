import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { selectItemDetail } from "../../../redux/store/store.selector.js";
import "react-modal-video/scss/modal-video.scss";
import { connect } from "react-redux";
import ReactTextCollapse from "../../react-text-collapse/ReactTextCollapse";
import {
  Wrap,
  Container,
  Span,
  ButtonContainer,
  PurchasedIcon,
  RemoveCartIcon,
  AddCartButton,
  AddCartIcon,
} from "./DetailBook.styles";
import {
  addItem,
  removeItem,
} from "../../../redux/wish-list/wishList.action.js";
import { selectPersonStart } from "../../../redux/person/person.action.js";
import { selectUserComments } from "../../../redux/store/store.selector";
import StripeCheckoutButton from "../../stripe-button/stripe-button.component";
import { MdDelete } from "react-icons/md";
import PopupComment from "../../popup-comment/popup-comment.component.jsx";
import User from "../../user/user.component";
import { firestore } from "../../../firebase/firebase.utils.js";
import RateBars from "../../rate-bar/rateBar-component.jsx";
import { signInWithGoggleStart } from "../../../redux/user/user.action.js";
import { TiTick } from "react-icons/ti";
import { selectBuyItems } from "../../../redux/buy-list/BuyList.selector.jsx";

const DetailBook = ({
  id,
  buyItems,
  addItem,
  currentUser,
  signInWithGoggleStart,
  listItems,
  removeItem,
  doc,
  selectPersonStart,
  item,
}) => {
  const {
    title,
    imgUrl,
    price,
    type,
    rate,
    description,
    author,
    published,
    authorImg,
    audio,
    publisher,
    page,
    language,
  } = item;
  const { audioBrand, audioReader, audioTime } = audio;
  const [comments, setComments] = useState([]);

  const job = "authors";
  const name = author;

  const added = listItems.find(
    (listItem) => listItem["item"].id === id && listItem["doc"] === doc
  );
  const buyed = useMemo(() => {
    return buyItems.find(
      (item) => item["item"].id === id && item["doc"] === doc
    );
  }, [buyItems, item]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const usersRef = firestore.collection("commentors").doc("book");
    usersRef.onSnapshot((snapShot) => {
      const { comments } = snapShot.data();
      comments.sort(function (a, b) {
        const DateStringA = a.date.split(",");
        const DateStringB = b.date.split(",");
        const DateA = `${DateStringA[2]} ${DateStringA[1]} ${DateStringA[3]} ${DateStringA[4]} ${DateStringA[5]}`;
        const DateB = `${DateStringB[2]} ${DateStringB[1]} ${DateStringB[3]} ${DateStringB[4]} ${DateStringB[5]}`;
        return Date.parse(DateB) - Date.parse(DateA);
      });
      setComments(comments);
    });
  }, [item]);

  const readMore = Math.floor(description.length / 3.3);
  const typeList = type.split(",");

  const option = useMemo(() => {
    return "book";
  }, []);

  const selectedComments = useMemo(
    () =>
      comments
        ? comments.filter(
            (comment) => comment.option === option && comment.itemID === id
          )
        : [],
    [comments]
  );

  const TEXT_COLLAPSE_OPTIONS = {
    collapse: false,
    collapseText: "READ MORE",
    expandText: "READ LESS",
    minHeight: 80,
    maxHeight: readMore,
    textStyle: {
      fontSize: 14,
      paddingLeft: "40%",
      color: "#898989",
      cursor: "pointer",
      fontWeight: "500",
      opacity: "0.8",
    },
  };

  return (
    <Container>
      <Wrap>
        <Wrap className="detail-img">
          <img src={imgUrl} />
        </Wrap>
        <Wrap className="detail-info">
          <Span className="title">{title}</Span>
          <Span className="date-author">
            <Link
              to={`/books/participant/${name}`}
              style={{ color: "#0396de", fontWeight: "500" }}
              classname="author"
              onClick={() => {
                selectPersonStart({ name, job });
              }}
            >
              {author}
            </Link>
            <span></span>
          </Span>

          <Span className="type-audio">
            <Span className="type">{publisher}</Span>
            <Span className="audio">{audioBrand}</Span>
          </Span>
          <Span className="reader-time">
            <Span className="type">Reader: {audioReader}</Span>
            <Span className="audio">{audioTime} minutes</Span>
          </Span>

          <ButtonContainer>
            {buyed ? (
              ""
            ) : !added ? (
              <AddCartButton
                onClick={() =>
                  currentUser ? addItem({ item, doc }) : signInWithGoggleStart()
                }
              >
                <AddCartIcon />
                Add to wish list
              </AddCartButton>
            ) : (
              <AddCartButton
                className="hover-cart"
                onClick={() => removeItem({ item, doc })}
              >
                <RemoveCartIcon className="button" />
                <MdDelete
                  className="button-hover"
                  style={{
                    position: "absolute",
                    color: "white",
                    fontSize: "22px",
                  }}
                />
                <span className="span">Already added</span>
                <span
                  style={{
                    paddingLeft: "25px",
                    color: "white",
                    position: "absolute",
                  }}
                  className="span-hover"
                >
                  Remove Item
                </span>
              </AddCartButton>
            )}
            {buyed ? (
              <PurchasedIcon>
                Purchased: {price},000 VND
                <TiTick />
              </PurchasedIcon>
            ) : (
              <StripeCheckoutButton
                item={item}
                doc={doc}
                price={price}
                content={`Buy: ${price},000 VND`}
              />
            )}
          </ButtonContainer>
        </Wrap>
      </Wrap>
      <Wrap className="seperate-line">
        <hr />
      </Wrap>
      <Wrap className="detail-video">
        <Wrap className="detail-video-img">
          <img src={authorImg} alt="" />
          <span className="trailer">{author}</span>
        </Wrap>
      </Wrap>
      <Wrap className="detail-description">
        {readMore > 100 ? (
          <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>
            <span>{description}</span>
          </ReactTextCollapse>
        ) : (
          <span>{description}</span>
        )}
      </Wrap>
      <Wrap className="seperate-line">
        <hr />
      </Wrap>
      <Wrap className="detail-production">
        <h2>ADDITIONAL INFORMATION</h2>
        <Wrap className="performer-producer">
          <Wrap className="performer">
            <h2>Publisher</h2>
            <Wrap className="performer-list">{publisher}</Wrap>
          </Wrap>
          <Wrap className="producer">
            <h2>Page</h2>
            <Wrap className="producer-list">{page}</Wrap>
          </Wrap>
        </Wrap>

        <Wrap className="director-writer">
          <Wrap className="director">
            <h2>Category</h2>
            <Wrap className="director-list">
              {typeList.map((type, index) => {
                if (index == typeList.length - 1) {
                  return <Link to={`/books/category/${type}`}>{type}</Link>;
                } else {
                  return (
                    <Link to={`/books/category/${type}`}>
                      {type}
                      <span style={{ paddingRight: "5px" }}>,</span>
                    </Link>
                  );
                }
              })}
            </Wrap>
          </Wrap>
          <Wrap className="writer">
            <h2>Language</h2>
            <Wrap className="writer-list">{language}</Wrap>
          </Wrap>
        </Wrap>

        <Wrap className="director-writer">
          <Wrap className="director">
            <h2>Most suitable</h2>
            <Wrap className="director-list"></Wrap>
          </Wrap>
        </Wrap>
      </Wrap>

      <Wrap className="seperate-line">
        <hr />
      </Wrap>

      <Wrap className="evaluate-section">
        <h2>EVALUATE </h2>
        <Wrap className="evaluate-button">
          <PopupComment
            id={id}
            currentUser={currentUser}
            option={option}
            imgUrl={imgUrl}
          />
        </Wrap>
        <Wrap className="rate-bar">
          <RateBars selectedComments={selectedComments}></RateBars>
        </Wrap>
      </Wrap>

      <Wrap className="comment-section">
        {selectedComments.length > 0
          ? selectedComments.map((userComment) => {
              const id = userComment.randomID;
              return <User key={id} userComment={userComment} />;
            })
          : []}
      </Wrap>
      <Wrap className="seperate-line">
        <hr />
      </Wrap>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ownProps: ownProps,
  userComment: selectUserComments,
  item: selectItemDetail("books", ownProps.chosenType, ownProps.id)(state),
  buyItems: selectBuyItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  selectPersonStart: (person) => dispatch(selectPersonStart(person)),
  signInWithGoggleStart: () => dispatch(signInWithGoggleStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailBook);
