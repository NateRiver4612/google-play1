import BuyActionTypes from "./BuyListAction.type";
import { buyItem } from "./BuyList.utils";

const INITIAL_STATE = {
  buyItems: [],
};

const buyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BuyActionTypes.BUY_ITEM_SUCCESS:
      return {
        ...state,
        buyItems: buyItem(state.buyItems, action.payload),
      };
    case BuyActionTypes.CLEAR_BUY_ITEMS:
      return {
        ...state,
        buyItems: [],
      };
    case BuyActionTypes.SET_BUY_ITEMS_FROM_FIREBASE:
      return {
        ...state,
        buyItems: action.payload,
      };
    default:
      return state;
  }
};

export default buyReducer;
