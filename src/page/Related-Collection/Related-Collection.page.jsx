import React, { useMemo, useCallback, useState } from "react";
import RelatedItem from "../../component/related-Item/Related-Item.component";
// import { createStructuredSelector } from 'reselect'
import { connect } from "react-redux";
import { selectItemsByOption } from "../../redux/store/store.selector";
import { selectItemDetail } from "../../redux/store/store.selector";

const RelatedCollection = ({
  id,
  type,
  itemDetail,
  chosenType,
  items,
  doc,
}) => {
  const CreateRandomItemsList = useCallback(
    (items) => {
      const typeArr = type.split(",");
      var relate = [];
      const relateId = [];
      var itemList = [];

      //create relate list with every related item include the current type
      Object.keys(items).map((key, value) => {
        if (typeArr.includes(key)) {
          const list = items[key];
          Object.keys(list).map((key) => {
            relate.push(list[key]);
          });
        }
      });

      //erase every duplicate item
      relate = relate.filter(
        (thing, index, self) =>
          index ===
          self.findIndex((t) => {
            return t.id === thing.id;
          })
      );

      // //the id of items except the chosen id
      relate.map((item) => {
        if (item["id"] !== id) {
          relateId.push(item["id"]);
        }
      });

      // //randomize the id list
      var ranlist = [];
      while (relateId.length > 0) {
        var random = relateId[Math.floor(Math.random() * relateId.length)];
        ranlist.push(random);
        relateId.splice(index(random, relateId), 1);
      }

      // //create list of items followed id list order
      ranlist.map((key) => {
        for (var i = 0; i < relate.length; i++) {
          if (relate[i]["id"] === key) {
            itemList.push(relate[i]);
            break;
          }
        }
      });

      if (doc == "movies") {
        var { director, writer, producer, performer } = itemDetail;
        itemList = itemList.filter((item) => {
          const itemPerformer = item.performer
            .trim()
            .split(",")
            .map((item) => item.trim());
          const itemProducer = item.producer
            .split(",")
            .map((item) => item.trim());
          const itemWriter = item.writer.split(",").map((item) => item.trim());
          const itemDirector = item.director
            .split(",")
            .map((item) => item.trim());

          return (
            itemPerformer.some((person) =>
              performer
                .split(",")
                .map((item) => item.trim())
                .includes(person)
            ) ||
            itemProducer.some((person) =>
              producer
                .split(",")
                .map((item) => item.trim())
                .includes(person)
            ) ||
            itemWriter.some((person) =>
              writer
                .split(",")
                .map((item) => item.trim())
                .includes(person)
            ) ||
            itemDirector.some((person) =>
              director
                .split(",")
                .map((item) => item.trim())
                .includes(person)
            )
          );
        });
      }

      if (doc == "books") {
        const { author } = itemDetail;
        itemList = itemList.filter((item) =>
          author.includes(item.author.split(",")[0].trim())
        );
      }
      return itemList;
    },
    [itemDetail]
  );

  //function to return in the index of given value from the given list
  const index = useCallback((item, arr) => {
    var one = 0;
    arr.map((key, index) => {
      if (parseInt(key) === parseInt(item)) {
        one = index;
      }
    });
    return one;
  }, []);

  return (
    <div>
      {doc === "movies"
        ? CreateRandomItemsList(items).map((key, index) => {
            if (index < 4) {
              const { title, price, id, rate, description, type, imgUrl } = key;
              // const oneType = type.includes(',') ? type.substr(0,type.indexOf(',')):type
              return (
                <RelatedItem
                  title={title}
                  id={id}
                  doc={doc}
                  key={id}
                  imgUrl={imgUrl}
                  price={price}
                  type={type}
                  rate={rate}
                  description={description}
                ></RelatedItem>
              );
            }
          })
        : doc === "books"
        ? CreateRandomItemsList(items).map((key, index) => {
            const { title, price, id, author, rate, description, imgUrl } = key;
            return (
              <RelatedItem
                title={title}
                doc={doc}
                id={id}
                key={id}
                imgUrl={imgUrl}
                price={price}
                author={author}
                rate={rate}
                description={description}
              ></RelatedItem>
            );
          })
        : []}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  items: selectItemsByOption(ownProps.doc)(state),
  itemDetail: selectItemDetail(
    ownProps.doc,
    ownProps.chosenType,
    ownProps.id
  )(state),
});
export default connect(mapStateToProps)(RelatedCollection);
