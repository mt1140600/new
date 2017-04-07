import { checkHttpStatus, parseJSON } from '../utils';
import { FETCH_ORDERS, SET_SEARCH_SPECS, TOGGLE_ORDER_SELECTED } from '../constant';
import * as constants from '../constants';
import 'whatwg-fetch';

const fillOrders = (orders) => {
  console.log("Inside fillOrders");
  console.log(orders);
  return{
    type: FETCH_ORDERS,
    payload: {
      orders
    }
  }
}


export const fetchOrders = (sellerId, type, orderBy, from, to, category, search_text, page) => {
  return function(dispatch){
    let url = constants.fetchOrders;
    url = url.replace(":seller_id", sellerId);
    if(type && typeof(type)!=='undefined') url = url + `${type}`;
    if(orderBy && typeof(orderBy)!=='undefined') url = url + `&orderBy=${orderBy}`;
    if(from && typeof(from)!=='undefined' && from !== 'Invalid date') url = url + `&from=${from}`; //Invalid date is assigned when we do moment().format()
    if(to && typeof(to)!=='undefined' && to !== 'Invalid date') url = url + `&to=${to}`;
    if(category && typeof(category)!=='undefined') url = url + `&category=${category}`;
    if(search_text && typeof(search_text)!=='undefined') url = url + `&search_text=${search_text}`;
    if(page && typeof(page)!=='undefined')  url = url + `&page=${page}`;

    return fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then( response => { dispatch(fillOrders(response)); })
    .catch( error => { console.log("Failed to fetch orders ", error); })
  }
}

export const setSearchSpecs = ( searchSpecs ) => {
  return{
    type: SET_SEARCH_SPECS,
    payload: {
      searchSpecs
    }
  }
}

export const toggleOrderSelected = ( index, value ) => {
  return{
    type: TOGGLE_ORDER_SELECTED,
    payload: {
      index: index,
      value: value
    }
  }
}

const dispatchOrders = (orders) => {
  console.log("Inside dispatchOrders");
  console.log(orders);
  return{
    type: FETCH_ORDERS,
    payload: {
      orders
    }
  }
}

export const updateDispatchOrders = (orders) => {
  return function(dispatch){
    let url = constants.fetchOrders;
    return fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(checkHttpStatus)
    .then(parseJSON)
    .then( response => { dispatch(fillOrders(response)); })
    .catch( error => { console.log("Failed to fetch orders ", error); })
  }
}
