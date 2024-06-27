import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {node} from 'prop-types';

export default function GuardRoute({children}) {
    const {user} = useSelector(state => state.auth);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user === null) {
            navigate('/login', {replace: true});
        }
    }, [navigate, user])

    return children;
}

GuardRoute.propTypes = {
    children: node,
}