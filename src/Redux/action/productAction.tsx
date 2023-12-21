export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const addProductList = (request: any) => ({  
  type: ADD_PRODUCT,
  payload: request,
});

// export const updateProductList = ({userDetail,detail}: any) => ({
//   type: UPDATE_PRODUCT,
//   payload: {userDetail,detail},
// });
