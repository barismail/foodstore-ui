import React from 'react';
import {useParams} from "react-router-dom";
import {getInvoiceByOrderId} from "../../api/invoice.js";
import axios from "axios";
import {Button, LayoutOne, Table, Text} from "upkit";
import TopBar from "../../components/TopBar";
import {BounceLoader} from "react-spinners";
import StatusLabel from "../../components/StatusLabel/index.jsx";
import {formatRupiah} from "../../utils/format-rupiah.js";
import {config} from "../../config.js";

export default function Invoice() {
    const [invoices, setInvoices] = React.useState(null);
    const [error, setError] = React.useState('');
    const [status, setStatus] = React.useState('process');
    const [initiatePayment, setInitiatePayment] = React.useState(false);
    const [requestError, setRequestError] = React.useState(false);

    const params = useParams();

    const handlePayment = async () => {
        setInitiatePayment(true);

        const {data: {token}} = await axios
            .get(`${config.api_host}/api/invoices/${params?.order_id}/initiate-payment`);
        if (!token) {
            setRequestError(true);
            return true;
        }

        setInitiatePayment(false);
        window.snap.pay(token);
    }

    React.useEffect(() => {
        getInvoiceByOrderId(params?.order_id)
            .then(({data}) => {
                if (data.error) {
                    setError(data.message || 'Terjadi kesalahan yang tidak diketahui')
                }

                setInvoices(data);
        }).finally(() => setStatus('idle'))
    }, [params])

    if (error.length || requestError) {
        return (
            <LayoutOne>
                <TopBar />
                <Text as='h3'>Terjadi kesalahan</Text>
                {error}
            </LayoutOne>
        )
    }

    if (status === 'process') {
        return (
            <LayoutOne>
               <div className="text-center py-10">
                   <div className="inline-block">
                       <BounceLoader color='red' />
                   </div>
               </div>
            </LayoutOne>
        )
    }

    return (
        <LayoutOne>
            <TopBar />
            <Text as='h3'>Invoice</Text>
            <br/>
            <Table
                showPagination={false}
                items={[
                    {label: 'Status', value: <StatusLabel status={invoices?.payment_status} />},
                    {label: 'Order ID', value: '#' + invoices?.order?.order_number},
                    {label: 'Total Amount', value: formatRupiah(invoices?.total)},
                    {label: 'Billed to', value: (
                        <div>
                            <b>{invoices?.user?.full_name}</b> <br/>
                            <b>{invoices?.user?.email}</b><br/>
                            <b>{invoices?.delivery_address?.detail_alamat}</b><br/>
                            <b>{invoices?.delivery_address?.kelurahan}</b><br/>
                            <b>{invoices?.delivery_address?.kecamatan}</b><br/>
                            <b>{invoices?.delivery_address?.kabupaten}</b><br/>
                            <b>{invoices?.delivery_address?.provinsi}</b>
                        </div>
                        )},
                    {label: 'Payment to', value: (
                        <div>
                            {config.owner} <br/>
                            {config.contact} <br/>
                            {config.billing.account_no} <br/>
                            {config.billing.bank_name}
                        </div>
                        )},
                ]}
                columns={[
                    {Header: 'Invoice', accessor: 'label'},
                    {Header: '', accessor: 'value'},
                ]}
            />
            {invoices?.payment_status !== 'paid' ? (
                <Button
                    disabled={initiatePayment}
                    onClick={handlePayment}
                >
                    {initiatePayment ? 'Loading....' : 'Bayar'}
                </Button>
            ) : null}
        </LayoutOne>
    )
}