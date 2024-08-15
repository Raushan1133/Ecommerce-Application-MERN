const backendDomain =  process.env.REACT_APP_BACKEND_URL //"http://localhost:8080"
const SummaryApi = {
    signUp : {
        url:`${backendDomain}/api/signup`,
        method:"post"
    },
    signIn:{
        url:`${backendDomain}/api/signin`,
        method:"post"
    },
    current_user: {
        url:`${backendDomain}/api/user-details`,
        method:'get'
    },
    logout_user :{
        url:`${backendDomain}/api/userLogout`,
        method:'get'
    },
    allUser: {
        url:`${backendDomain}/api/all-user`,
        method:'get'
    },
    updateUser:{
        url:`${backendDomain}/api/update-user`,
        method:'post'
    },
    uploadProduct:{
        url:`${backendDomain}/api/upload-product`,
        method:'post'
    },
    allProduct:{
        url:`${backendDomain}/api/get-product`,
        method:'get'
    },
    updateProduct:{
        url:`${backendDomain}/api/update-product`,
        method:'post'
    },
    categoryProduct:{
        url:`${backendDomain}/api/get-productCategory`,
        method:'get'
    },
    categoryWiseProduct: {
        url:`${backendDomain}/api/category-product`,
        method:'post'
    },
    productDetails:{
        url:`${backendDomain}/api/product-details`,
        method:'post'
    },
    addToCart:{
        url:`${backendDomain}/api/addtocart`,
        method:'post'
    },
    countAddToCart:{
        url:`${backendDomain}/api/countAddToCart`,
        method:'get'
    },
    cartView:{
        url:`${backendDomain}/api/viewCart`,
        method:'get'
    },
    updateCart:{
        url:`${backendDomain}/api/update-cart`,
        method:'post'
    },
    deleteCartProduct:{
        url:`${backendDomain}/api/delete-cart-product`,
        method:'post'
    },
    searchProduct: {
        url:`${backendDomain}/api/search`,
        method:'get'
    },
    filterProduct:{
        url:`${backendDomain}/api/filter-product`,
        method:'post'
    },
    payment : {
        url:`${backendDomain}/api/checkout`,
        method:'post'
    },
    getOrder : {
        url:`${backendDomain}/api/order-list`,
        method:'get'
    },
    getAllOrders : {
        url:`${backendDomain}/api/all-orders`,
        method:'get'
    },
    sendPassword:{
        url:`${backendDomain}/api/send-password-email`,
        method:'post'
    },
    resetPassword:{
        url:`${backendDomain}/api/reset-password`,
        method:'post'
    },
    updateUserProfile:{
        url:`${backendDomain}/api/update-profile`,
        method:'post'
    }

}

export default  SummaryApi
