import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'

const ProtectedRotes = ({element: Element, ...rest}) => {
    const {isLoggedIn} = useSelector(state=> state.user)
    if(!isLoggedIn){
    }
    return isLoggedIn ? <Element {...rest} /> : <Navigate to="/user/login" />;

}

export default ProtectedRotes
