export function userSignUp (payload){  
	return { type: "USER/SIGN_UP", payload: payload } 
}

export function updateLoginStatus (payload){ 
	let updatedUserStatus = {
		...payload.user,
		isLoggedIn : payload.status
	}
	return { type: "USER/UPDATE_USER_LOGIN_STATUS", payload: {'index' : payload.index, 'status' : updatedUserStatus} } 
}

export function addAmountToWallet (payload){  
	return { type: "USER/ADD_AMOUNT_TO_WALLET", payload: payload } 
}

export function updateWalletAfterTransaction (payload){  
	return { type: "USER/UPDATE_WALLET_AFTER_TRANSACTION", payload: payload } 
}


