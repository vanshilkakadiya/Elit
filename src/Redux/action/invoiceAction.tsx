export const ADD_INVOICE = 'ADD_INVOICE';

export const addInvoice = (request: any) => ({
  type: ADD_INVOICE,
  payload: request,
});
