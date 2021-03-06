import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserIsAuthenticated, UserIsNotAuthenticated, UserIsEmailVerified, UserIsApproved } from './utils/authWrappers.js'
import AccountSetup from './containers/AccountSetup';
import EditProfile from './containers/EditProfile';
import App from './components/App';
import Signup from './views/Signup';
import ResetPassword from './views/ResetPassword';
import ResetPassword2 from './views/ResetPassword2';
import Login from './views/Login';
import ProductUpload from './containers/ProductUpload';
import Verification from './views/Verification';
import VerifyEmail from './views/VerifyEmail';
import UploadProductDumb from './panelViews/UploadProductDumb';
import UploadProduct from './panelViews/UploadProduct';
import UploadHistory from './panelViews/UploadHistory';
import {Orders, New, Confirmed, Dispatched, Cancelled} from './panelViews/OrdersPanel';
import Returns from './panelViews/Returns';
import Completed from './panelViews/Completed';
import Payment from './panelViews/Payment';
import ManageInventory from './panelViews/ManageInventory';
import SampleHOC from './components/SampleHOC';
import UploadProductViaSearch from './panelViews/UploadProductViaSearch';
import Test from './components/Test';

export default (
  // <Route path="/" component={App}>
  //   <IndexRoute component={UserIsNotAuthenticated(Login)}/>
  //   <Route path="signup" component={UserIsNotAuthenticated(Signup)} />
  //   <Route path="verifyEmail" component={VerifyEmail} />
  //   <Route path="reset" component={UserIsNotAuthenticated(ResetPassword)} />
  //   <Route path="reset2" component={UserIsNotAuthenticated(ResetPassword2)} />
  //   <Route path="registration" component={UserIsAuthenticated(UserIsEmailVerified(AccountSetup))}/>
  //   <Route path="verification" component={UserIsAuthenticated(UserIsEmailVerified(Verification))} />
  //   <Route path="profile" component={UserIsAuthenticated(UserIsEmailVerified(UserIsApproved(EditProfile)))} />
  //   <Route path="dashboard" component={UserIsAuthenticated(UserIsEmailVerified(UserIsApproved(ProductUpload)))}>
  //     <IndexRoute component={UploadProductDumb} />
  //     <Route path="bulkUpload" component={UploadProduct} />
  //     <Route path="uploadHistory" component={UploadHistory} />
  //     <Route path="orders" component={Orders}>
  //       <IndexRoute component={New} />
  //       <Route path="confirmed" component={Confirmed} />
  //       <Route path="dispatched" component={Dispatched} />
  //       <Route path="cancelled" component={Cancelled} />v
  //     </Route>
  //     <Route path="returns" component={Returns} />
  //     <Route path="completed" component={Completed} />
  //     <Route path="payment" component={Payment} />
  //     <Route path="inventory" component={ManageInventory} />
  //   </Route>
  // </Route>
  //
  <Route path="/" component={App}>
    <IndexRoute component={Login}/>
    <Route path="signup" component={Signup} />
    <Route path="verifyEmail" component={VerifyEmail} />
    <Route path="reset" component={ResetPassword} />
    <Route path="reset2" component={ResetPassword2} />
    <Route path="registration" component={AccountSetup}/>
  
    <Route path="profile" component={EditProfile} />
  
    <Route path="dashboard" component={ProductUpload}>
      <IndexRoute component={UploadProductDumb} />
      <Route path="bulkUpload" component={UploadProduct} />
      <Route path="uploadHistory" component={UploadHistory} />
      <Route path="orders" component={Orders}>
        <IndexRoute component={New} />
        <Route path="confirmed" component={Confirmed} />
        <Route path="dispatched" component={Dispatched} />
        <Route path="cancelled" component={Cancelled} />v
      </Route>
      <Route path="returns" component={Returns} />
      <Route path="completed" component={Completed} />
      <Route path="payment" component={Payment} />
      <Route path="inventory" component={ManageInventory} />
    </Route>
  //
    <Route path="verification" component={Verification} />
    <Route path="hoc" component={SampleHOC} />
    <Route path="search" component={UploadProductViaSearch} />
    <Route path="test" component={Test} />
  </Route>
  //
);
