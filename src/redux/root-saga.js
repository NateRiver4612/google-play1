import { all,call } from "redux-saga/effects";
import {storeSaga} from './store/store.saga'
import { itemSaga } from "./Item/item.saga";
import {wishListSaga} from './wish-list/wishList.saga'
import { userSaga } from "./user/user.saga";
import { personSaga } from "./person/person.saga";
import { buySaga } from "./buy-list/BuyList.saga";
export default function* rootSaga(){
    yield all([call(storeSaga),call(itemSaga),call(userSaga),call(wishListSaga),call(personSaga),call(buySaga)])
}
