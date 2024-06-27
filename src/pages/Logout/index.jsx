import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../api/auth.js";
import {userLogout} from "../../features/Auth/actions.js";
import {LayoutOne} from "upkit";
import {BounceLoader} from "react-spinners";

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        logout()
            .then(() => dispatch(userLogout()))
            .then(() => navigate('/', {replace: true}))
    }, [dispatch, navigate])

    return (
        <LayoutOne size='small'>
            <div className="text-center flex flex-col justify-center items-center">
                <BounceLoader color='red'/>
                <br/>
                Logging out...
            </div>
        </LayoutOne>
    )
}