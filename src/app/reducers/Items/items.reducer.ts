import { Item } from "../../models/item.model";

import { createReducer, on, ActionsSubject } from "@ngrx/store";
import { saveItemToStore } from "./items.action";

export const initialStateItemsArray: Item[] = [];

const _stateItemsReducer = createReducer(
  initialStateItemsArray,
  on(saveItemToStore, (state, action) => action.items)
);

export function stateItemsReducer(state, action) {
  return _stateItemsReducer(state, action);
}
