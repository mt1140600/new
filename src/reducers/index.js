import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import userData from './userData';
import productUploadData from './productUploadData';
import floatingNotification from './generic';
import * as registrationForm from './registrationForm';
import orderManagement from './orderManagement';
import cascadedDisplay from './cascadedDisplay';
import dashboard from './dashboard.js';

const rootReducer = combineReducers({
  routing: routerReducer,
  userData: userData,
  dashboard: dashboard,
  productUploadData: productUploadData,
  registrationCurrentTab: registrationForm.tabReducer,
  verifyOtp: registrationForm.verifyOtp,
  sellerInfo: registrationForm.sellerInfo,
  taxDetails: registrationForm.taxDetails,
  paymentDetails: registrationForm.paymentDetails,
  pocDetails: registrationForm.pocDetails,
  addlInfo: registrationForm.addlInfo,
  tabValidation: registrationForm.tabValidation,
  floatingNotification: floatingNotification,
  ordersData: orderManagement,
  cascadedDisplay: cascadedDisplay
});

export default rootReducer;
