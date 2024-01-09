import { ADD_INVOICE, SET_INVOICE_DATA } from "../action/invoiceAction";
  
  const initialState: any = {
    invoiceList: [],
  };
  
  const invoiceReducer = (state = initialState, action: any) => {  
    switch (action.type) {
      case ADD_INVOICE: {
        return {
          ...state,
          invoiceList: [...state.invoiceList, action?.payload],
        };        
      }

      case SET_INVOICE_DATA: {
        return {
          ...state,
          invoiceList: [...action?.payload],
        };
      }
      default:
        return state;
    }
  };
  
  export default invoiceReducer;
  