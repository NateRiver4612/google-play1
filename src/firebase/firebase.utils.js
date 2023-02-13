import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCqpxcarSv5-2RT5oM0J5g6wbp2AynQaeo",
  authDomain: "gg-play-993ad.firebaseapp.com",
  databaseURL: "https://gg-play-993ad-default-rtdb.firebaseio.com",
  projectId: "gg-play-993ad",
  storageBucket: "gg-play-993ad.appspot.com",
  messagingSenderId: "394283999550",
  appId: "1:394283999550:web:02dfef621c67f4519d0c6f",
  measurementId: "G-VQBJH2Y8H1",
};

firebase.initializeApp(firebaseConfig);

export const getUserCart = async (userId) => {
  const userRef = firestore
    .collection("wishlist")
    .where("userId", "==", userId);
  const snapShot = await userRef.get();
  if (snapShot.empty) {
    const wishListRef = firestore.collection("wishlist").doc(userId);
    await wishListRef.set({ userId, wishListItems: [] });
    return wishListRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const getUserBuyItems = async (userId) => {
  const userRef = firestore.collection("buylist").where("userId", "==", userId);
  const snapShot = await userRef.get();

  if (snapShot.empty) {
    const userBuyRef = firestore.collection("buylist").doc(userId);
    await userBuyRef.set({
      userId: userId,
      buyItems: [],
    });
    return userBuyRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.collection("users").doc(userAuth.uid);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createTime = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createTime,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userRef;
};
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const convertCollectionsSnapshotToMap = (snapShot) => {
  var Items = {};
  var movies = {};
  var books = {};

  snapShot.docs.map((doc) => {
    const id = doc.id;
    const { categories } = doc.data();

    if (id === "book") {
      const history = {}; //
      const thriller = {}; //
      const scienceMath = {}; //
      const fiction = {}; //

      categories.map((doc, index) => {
        if (doc.type.includes("History")) {
          //
          history[index] = { id: index, ...doc };
        }
        if (doc.type.includes("Thriller")) {
          //
          thriller[index] = { id: index, ...doc };
        }
        if (doc.type.includes("Fiction")) {
          //
          fiction[index] = { id: index, ...doc };
        }
        if (doc.type.includes("Science and Math")) {
          //
          scienceMath[index] = { id: index, ...doc };
        }
      });

      books = {
        History: history,
        Fiction: fiction,
        Thriller: thriller,
        "Science and Math": scienceMath,
      };
    }
    if (id === "movie") {
      const actionAventure = {};
      const family = {};
      const drama = {};
      const horror = {};

      categories.map((doc, index) => {
        if (doc.type.includes("Action and adventure")) {
          actionAventure[index] = { id: index, ...doc };
        }
        if (doc.type.includes("Family")) {
          family[index] = { id: index, ...doc };
        }
        if (doc.type.includes("Drama")) {
          drama[index] = { id: index, ...doc };
        }
        if (doc.type.includes("Horror")) {
          horror[index] = { id: index, ...doc };
        }
      });
      movies = {
        "Action and adventure": actionAventure,
        Family: family,
        Drama: drama,
        Horror: horror,
      };
    }
  });

  Items = {
    movies: movies,
    books: books,
  };

  return Items;
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export default firebase;
