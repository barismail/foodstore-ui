import axios from "axios";
import {config} from "../config.js";

export async function getInvoiceByOrderId(order_id) {
    const {token} = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
    return await axios.get(`${config.api_host}/api/invoices/${order_id}`, {
        headers: {'Authorization': `Bearer ${token}`},
    })
}