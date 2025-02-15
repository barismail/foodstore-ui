import axios from 'axios'
import {config} from '../config.js'

export async function registerUser(data) {
    return await axios.post(`${config.api_host}/auth/register`, data)
}

export async function login({email, password}) {
    return await axios.post(`${config.api_host}/auth/login`, {email, password})
}

export async function logout() {
    let {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.api_host}/auth/logout`, null, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    }).then(res => {
        localStorage.removeItem('auth');
        return res;
    })
}