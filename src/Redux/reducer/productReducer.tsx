import {
  ADD_PRODUCT,
} from '../action/productAction';

const initialState: any = {
  productList: [],
};

const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      return {
        ...state,
        productList: action?.payload,
      };
    }
    default:
      return state;
  }
};

export default productReducer;
