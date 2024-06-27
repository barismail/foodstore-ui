import axios from "axios";
import {config} from "../config.js";

export async function createOrder(payload) {
    const {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    return axios.post(`${config.api_host}/api/orders`, payload, {
        headers: {'Authorization': `Bearer ${token}`},
    })
}

export async function getAllOrders(params) {
    const {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    const {limit, page} = params;
    const skip = (page * limit) - limit;

    return axios.get(`${config.api_host}/api/orders`, {
    params: {
        limit,
        skip,
    }, headers: {
        Authorization: `Bearer ${token}`,
        }
    })
}