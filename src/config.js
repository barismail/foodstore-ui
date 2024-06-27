const config = {
    api_host: import.meta.env.VITE_API_HOST,
    site_title: import.meta.env.VITE_SITE_TITLE,
    global_ongkir: import.meta.env.VITE_GLOBAL_ONGKIR,
    owner: import.meta.env.VITE_OWNER,
    contact: import.meta.env.VITE_CONTACT,
    billing: {
        account_no: import.meta.env.VITE_BILLING_NO,
        bank_name: import.meta.env.VITE_BANK_NAME,
    }
}

export {config};