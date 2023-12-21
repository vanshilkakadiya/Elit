import {
  ADD_CUSTOMERLIST,
  DELETE_CUSTOMERLIST,
  UPDATE_CUSTOMERLIST,
} from '../action/action';

const initialState: any = {
  customerList: [],
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
    // case DELETE_CUSTOMERLIST: {
    //   const deleteData = state.customerData.filter((item: any) => {
    //     return item.id != action.payload;
    //   });
    //   return {customerData: deleteData};
    // }

    // case UPDATE_CUSTOMERLIST: {      
    //   const temp = [...state.customerData];
    //   console.log(temp,"temptemptemptemptemptempstart");
    //   const index = state.customerData.findIndex(
    //     (item: any) => item.id === action.payload.id,
    //   );
    //   console.log(index,"indexindexindex");
    //   temp[index].data = action.payload.userDetail;
    //   temp[index].id = action.payload.id;
    //   return {...state, customerData: temp};
    // }
    
    default:
      return state;
  }
};
export default customerReducer;
