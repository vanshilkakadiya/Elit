import {
  ADD_CUSTOMERLIST,
} from '../action/action';

const initialState: any = {
  customerData: [],
};

const customerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_CUSTOMERLIST: {
      return {
        ...state,
        customerData: action?.payload,
      };
    }
    
    default:
      return state;
  }
};
export default customerReducer;
