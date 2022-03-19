import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)


  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    console.log(user);
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setCheckingStatus(false)
  
  }, [user])


  return {loggedIn, checkingStatus}
}

export default useAuthStatus