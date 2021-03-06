import { FETCH_ORDERS, SET_SEARCH_SPECS, TOGGLE_ORDER_SELECTED  } from '../constant';
import Immutable from 'immutable';

const initial_state = {
  searchSpecs: {},
  orders: []
};

const addSelectedKey = function(item){
    item.selected = false;
    return item;
}

const orderManagement = (state = initial_state, action) => {
  let newPayload, newSearchSpecs, newState;
  switch(action.type){
      case FETCH_ORDERS:
        newPayload = action.payload.orders;
        newPayload.rows = newPayload.rows.map(addSelectedKey)
        console.log(newPayload);
        return Object.assign({}, state, {orders: newPayload});
      // break;
      case SET_SEARCH_SPECS:
        newSearchSpecs = Object.assign({}, state.searchSpecs, action.payload.searchSpecs);
        return Object.assign({}, state, {searchSpecs: newSearchSpecs});
      // break;
      case TOGGLE_ORDER_SELECTED:
        newState = Immutable.fromJS(state);
        newState = newState.toJS();
        newState.orders.rows[action.payload.index].selected = action.payload.value;
        return newState;
      // break;
      default:
        return state;
  }

}

export default orderManagement;
