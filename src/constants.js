export const states = ["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Pondicherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttrakhand","West Bengal"];
export const daysOfTheWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
export const productCategories = ["All Categories","Clothing","Electronics & Accessories","Footwear"];
export const businessType = ["Individual", "Limited", "Partnership", "Proprietorship", "Private Limited", "Other"];
export const operationalHours = [1,2,3,4,5,6,7,8,9,10,11,12];
export const operationalHours2 = ["1:00","1:30","2:00","2:30","3:00","3:30","4:00","4:30","5:00","5:30","6:00","6:30","7:00","7:30","8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30"];
export const googleApiKey = "AIzaSyBCIKVw7HU6SO6Zn7ff_DUEkQ7blpDwu3Q";
export const pathGeocode = "http://maps.googleapis.com/maps/api/geocode/json?address=";
export const reCaptchaSiteKey = "6Lf8BA4UAAAAAO09u8gvITIdIij2mGGVcdfIwLDB";
export const reCaptchaSecretKey = "6Lf8BA4UAAAAAP22CL02OVXJnlr3xoxZSEs4qIRA";


// export const url = (process.env.NODE_ENV === "development")? "http://dev.adminapi.prokure.it": "http://adminapi.prokure.it";
// export const url = "http://adminapi.prokure.it";
// export const url = "http://localhost:3000";
export const url = "http://52.172.204.148";


export const pincodeToAddress = `${url}/api/bank_address?pincode=`;
export const requestOtp = `${url}/api/phone/request_otp/`;
export const requestOtpAgain = `${url}/api/phone/request_otp_again`;
export const verifyOtp = `${url}/api/merchant/phone/verify`;
export const saveForm = `${url}/api/merchant/update`;
export const getForm = `${url}/api/merchant/info`;
export const forgotPassword = `${url}/api/merchant/reset_password_request?merchantEmail=`;
export const newPasswordUrl = `${url}/api/merchant/reset_password?token=`;
export const fetchOrders = `${url}/api/seller_orders/:seller_id?type=`;
export const fetchUploads = `${url}/api/seller_orders/:seller_id?type=`;
export const searchProduct = "http://adminapi.prokure.it/api/products/search/";
export const uploadProducts = `${url}/api/products/seller_upload`;

export const cloudinaryCloudName = "prokure";
export const cloudinaryImageUploadPreset = "ahibedth";
export const cloduinaryMerchantInfoFolder = "MerchantInfo";
export const cloudinaryChatFolder = "SellerChat";

export const cloudinaryCsvUploadPreset = "aas3tkko";
export const cloudinaryProductUploadDumbPreset = "f5lmbf5o";

// export const cloudinaryProductUploadFolder = "productUpload";
