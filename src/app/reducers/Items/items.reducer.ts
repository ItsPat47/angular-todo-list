import { Item } from "../../models/item.model";

import { createReducer, on } from "@ngrx/store";
import { increment, saveItemToStore } from "./Items.action";

//////test////
export const initialState = 0;

const _stateTestReducer = createReducer(
  initialState,
  on(increment, state => state + 1)
);

export function changeStateTestReducer(state, action) {
  return _stateTestReducer(state, action);
}

///////////

///TEST ARRAY
export const initialStateItemsArray: Item[] = [
  { task: "do job", done: false },
  { task: "do more stuff", done: false }
];

const _stateItemsReducer = createReducer(
  initialStateItemsArray,
  on(saveItemToStore, (state, action) => action.items)
);

export function stateItemsReducer(state, action) {
  return _stateItemsReducer(state, action);
}
/////////
