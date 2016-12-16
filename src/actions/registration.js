export const actionTabChange = (tab) => {
    return {
    type: 'Set Registration Tab',
    value: tab
  }
}

function actionCreator(actionName){
  return (field, value, vState) => {
    return{
      type: actionName,
      payload: {
        field: field,
        vState: vState,
        value: value
        // [`${field}`]: value
      }
    }
  }
}

export const updateSellerInfo = actionCreator("Update Seller Info");
export const updateTaxDetails = actionCreator("Update Tax Details");
export const updatePaymentDetails = actionCreator("Update Payment Details");
export const updatePOCDetails = actionCreator("Update POC Details");
export const updateAddlInfo = actionCreator("Update Addl Info");
export const updateVerifyOtp = actionCreator("Update Verify OTP");

export const updateTabValidation = (index, vState) => {
  console.log("inside function");
  return {
    type: "Set Tab Validation",
    payload: {
      index: index,
      vState: vState
    }
  }
}
