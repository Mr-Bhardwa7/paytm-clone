var initialState = { 
   transactions: [],
}

export default function TransactionReducer(state = initialState, action) {
    switch (action.type) {
      
    case 'TRANSACTION/ADD_TRANSACTION_HISTORY':
        return {
              ...state,
              transactions: state.transactions.concat(action.payload)
          };

      default:
        return state
  }
}