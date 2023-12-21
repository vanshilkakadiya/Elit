import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from '../action/productAction';

const initialState: any = {
  productList: [],
};

const productReducer = (state = initialState, action: any) => {
  // console.log(state, 'all data of state is in reducer = ',action,"action is +++");

  switch (action.type) {
    case ADD_PRODUCT: {
      return {
        ...state,
        productList: action?.payload,
      };
    }

    // case UPDATE_PRODUCT: {
    //   const temp = [...state.productList];
    //   const index = state.productList.findIndex(
    //     (val: any) => action.payload.detail.id == val.id,
    //   );
    //   temp[index].data = action.payload.userDetail;
    //   
    //   return {...state, customerData: temp};
    // }

    default:
      return state;
  }
};

export default productReducer;
