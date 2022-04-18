import {useEffect, useState} from 'react'
import {getAuth, onAuthStateChange} from 'firebase/auth'

export function useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false)
	const [checkingStatus, setCheckingStatus] = useState(true)

	useEffect(() => {
		const auth = getAuth()
		onAuthStateChange(auth, (user) => {
			if(user) {
				setLoggedIn(true)
			}
			setCheckingStatus(false)
		})
	})

	return {loggedIn, checkingStatus}
}