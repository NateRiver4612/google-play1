import CartActionTypes from "./cart.types";

const INITIAL_STATE = {
  cartCategories: {
    movies: ["Action and adventure", "Family", "Horror", "Drama"],
    books: ["History", "Fiction", "Thriller", "Science and Math"],
    apps: [
      "Game",
      "Maps and navigation",
      "Shopping",
      "Music and Sounds",
      "Health and Fitness",
    ],
  },
  currentCart: "Category",
  hidden: true,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.SELECT_CART:
      return {
        ...state,
        currentCart: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
