import axios from "axios";
import {config} from "../config.js";

export function createAddress(payload) {
    const {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    return axios.post(`${config.api_host}/api/delivery-addresses`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export function getAddress(params) {
    const {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    return axios.get(`${config.api_host}/api/delivery-addresses`, {
        params: {
            limit: params.limit,
            skip: params.page * params.limit - params.limit,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}