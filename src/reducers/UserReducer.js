var initialState = { 
   users: [],
}

export default function UserReducer(state = initialState, action) {
    switch (action.type) {
      
    case 'USER/SIGN_UP':
        return {
              ...state,
              users: state.users.concat(action.payload)
          };

    case 'USER/UPDATE_USER_LOGIN_STATUS':
        state.users[action.payload.index] = action.payload.status
        return {
              ...state
          };
        
    case 'USER/ADD_AMOUNT_TO_WALLET' :
        let index = state.users.findIndex( value => value.id === action.payload.id);
        let currentUser = state.users[index]
        currentUser.transaction.wallet += action.payload.amount
        return {
            ...state
        }

    case 'USER/UPDATE_WALLET_AFTER_TRANSACTION' : 
        let senderIndex = state.users.findIndex( value => value.id === action.payload.sender_id);
        let sender = state.users[senderIndex]
        sender.transaction.wallet = sender.transaction.wallet - action.payload.amount
        sender.transaction.sent = sender.transaction.sent + action.payload.amount

        let recieverIndex = state.users.findIndex( value => value.id === action.payload.reciever_id);
        let reciever = state.users[recieverIndex]
        reciever.transaction.wallet = reciever.transaction.wallet + action.payload.amount
        reciever.transaction.recieve = reciever.transaction.recieve + action.payload.amount

        return {
            ...state
        }

      default:
        return state
  }
}