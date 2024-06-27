import axios from "axios";
import {config} from "../config.js";
import {store} from "../app/store.js";
import {setItems} from "../features/Cart/actions.js";

export async function getCart() {
    const {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    if (!token) return true;

    const {data} = await axios.get(`${config.api_host}/api/carts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if (!data.error) {
        store.dispatch(setItems(data))
    }
}

export async function saveCart(token, cart) {
    return axios.put(`${config.api_host}/api/carts`, {items: cart}, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })

}