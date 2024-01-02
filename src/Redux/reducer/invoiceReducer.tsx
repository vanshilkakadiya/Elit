import { ADD_INVOICE } from "../action/invoiceAction";
  
  const initialState: any = {
    invoiceList: [],
  };
  
  const invoiceReducer = (state = initialState, action: any) => {
    console.log(action.type,"action is =");
  
    switch (action.type) {
      case ADD_INVOICE: {
        return {
          ...state,
          invoiceList: action?.payload,
        };        
      }
      default:
        return state;
    }
  };
  
  export default invoiceReducer;
  