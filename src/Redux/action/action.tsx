export const ADD_CUSTOMERLIST = 'ADD_CUSTOMERLIST';
export const DELETE_CUSTOMERLIST = 'DELETE_CUSTOMERLIST';
export const UPDATE_CUSTOMERLIST = 'UPDATE_CUSTOMERLIST';

export const addCustomerList = (request: any) => ({
  type: ADD_CUSTOMERLIST,
  payload: request,
});

// export const deleteCustomerList = (request: any) => ({
//   type: DELETE_CUSTOMERLIST,
//   payload: request,
// });

// export const updateCustomerList = ({userDetail, id}: any) => ({
//   type: UPDATE_CUSTOMERLIST,
//   payload: {userDetail,id},
// });
