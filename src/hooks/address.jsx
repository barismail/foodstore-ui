import React from 'react';
import {getAddress} from "../api/address.js";

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error',
}

export function useAddressData() {
    const [data, setData] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [status, setStatus] = React.useState(statusList.idle);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);

    const fetchAddress = React.useCallback(async () => {
        setStatus(statusList.process);
        const {data: {data, count, error}} = await getAddress({page, limit});
        if (error) {
            setStatus(statusList.error);
            return true;
        }

        setStatus(statusList.success);
        setData(data);
        setCount(count);
    }, [page, limit])

    React.useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    return {
        data,
        count,
        status,
        page,
        limit,
        setPage,
        setLimit,
    }
}