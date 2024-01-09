export const ADD_INVOICE = 'ADD_INVOICE';
export const SET_INVOICE_DATA = 'SET_INVOICE_DATA';

export const addInvoice = (request: any) => ({
  type: ADD_INVOICE,
  payload: request,
});
export const setInvoiceData = (request: any) => ({
  type: SET_INVOICE_DATA,
  payload: request,
});
