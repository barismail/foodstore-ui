import React from 'react';
import StatusLabel from "../../components/StatusLabel/index.jsx";
import {formatRupiah} from "../../utils/format-rupiah.js";
import {sumPrice} from "../../utils/sum-price.js";
import {Link} from "react-router-dom";
import {Button, LayoutOne, Table, Text} from "upkit";
import {FaFileInvoiceDollar} from "@meronex/icons/fa";
import {getAllOrders} from "../../api/order.js";
import TopBar from "../../components/TopBar/index.jsx";

const columns = [
    {
        Header: '',
        id: 'Status',
        accessor: order => (
            <div>
                #{order.order_number} <br/>
                <StatusLabel status={order.status} />
            </div>
        )
    },
    {
        Header: 'Items',
        accessor: order => (
            <div>
                {order.order_items.map((item) => (
                    <div key={item._id}>
                        {item.name} {item.qty}
                    </div>
                ))}
            </div>
        )
    },
    {
        Header: 'Total',
        accessor: order => (
            <div>
                {formatRupiah(sumPrice(order.order_items) + order.delivery_fee)}
            </div>
        )
    },
    {
        Header: 'Invoice',
        accessor: order => (
            <div>
                <Link to={`/invoice/${order._id}`}>
                    <Button color='gray' iconBefore={<FaFileInvoiceDollar />}>Invoice</Button>
                </Link>
            </div>
        )
    }
]

export default function UserOrders() {
    const [pesanan, setPesanan] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [status, setStatus] = React.useState('idle');
    const [page, setPage] = React.useState(1);
    const [limit] = React.useState(10);

    const fetchPesanan = React.useCallback(async () => {
        setStatus('process');

        const {data} = await getAllOrders({limit, page});
        if (data.error) {
            setStatus('error');
            return true;
        }

        setStatus('success');
        setPesanan(data.data);
        setCount(data.count);
    }, [page, limit])

    React.useEffect(() => {
        fetchPesanan();
    }, [fetchPesanan])

    return (
        <LayoutOne>
            <TopBar />
            <Text as='h3'>Pesanan anda</Text>
            <br/>
            <Table
                items={pesanan}
                totalItems={count}
                columns={columns}
                page={page}
                isLoading={status === 'process'}
                onPageChange={page => setPage(page)}
            />
        </LayoutOne>
    )
}