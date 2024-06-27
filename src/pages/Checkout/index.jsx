import React from 'react';
import {Button, LayoutOne, Responsive, Steps, Table, Text} from "upkit";
import TopBar from "../../components/TopBar";
import IconWrapper from "../../components/IconWrapper";
import {FaCartPlus, FaAddressCard, FaInfoCircle, FaArrowRight, FaArrowLeft, FaRegCheckCircle} from '@meronex/icons/fa'
import {config} from "../../config.js";
import {formatRupiah} from "../../utils/format-rupiah.js";
import {useDispatch, useSelector} from "react-redux";
import {sumPrice} from "../../utils/sum-price.js";
import {useAddressData} from "../../hooks/address.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {createOrder} from "../../api/order.js";
import {clearItems} from "../../features/Cart/actions.js";

const steps = [
    {
        label: 'Item',
        icon: (
            <IconWrapper>
                <div className="text-3xl flex justify-center">
                    <FaCartPlus />
                </div>
            </IconWrapper>
        )
    },
    {
        label: 'Alamat',
        icon: (
            <IconWrapper>
                <div className="text-3xl flex justify-center">
                    <FaAddressCard />
                </div>
            </IconWrapper>
        )
    },
    {
        label: 'Konfirmasi',
        icon: (
            <IconWrapper>
                <div className="text-3xl flex justify-center">
                    <FaInfoCircle />
                </div>
            </IconWrapper>
        )
    }
]

const columns = [
    {
        Header: 'Nama Product',
        accessor: item => <div className='flex items-center'>
            <img src={`${config.api_host}/upload/${item.image_url}`} alt={item.name} width="48" />
            {item.name}
        </div>,
    },
    {
        Header: 'Jumlah',
        accessor: 'qty'
    },
    {
        Header: 'Harga Satuan',
        id: 'price',
        accessor: item => <span>@{formatRupiah(item.price)}</span>,
    },
    {
        Header: 'Harga Total',
        id: 'subtotal',
        accessor: item => <div>{formatRupiah(item.price * item.qty)}</div>,
    }
]

const addressColums = [
    {
        Header: 'Nama Alamat',
        accessor: alamat => <div>{alamat.nama_alamat} <br/> <small>
            {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan}, {alamat.kelurahan} <br/>
            {alamat.detail_alamat}
        </small></div>,
    }
]

const confirmColumns = [
    {
        Header: '',
        accessor: 'label',
    },
    {
        Header: '',
        accessor: 'value',
    }
]

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0)
    const [selectedAddress, setSelectedAddress] = React.useState(null)
    const cart = useSelector(state => state.cart);
    const {
        data,
        count,
        status,
        page,
        setPage,
        limit
    } = useAddressData()

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleCreator = async () => {
        const payload = {
            delivery_fee: config.global_ongkir,
            delivery_address: selectedAddress._id,
        }

        const {data} = await createOrder(payload);
        if (data?.error) return true;

        navigate(`/invoice/${data._id}`, {replace: true});
        dispatch(clearItems());
    }

    if (!cart.length) {
        return <Navigate to='/' replace/>
    }

    return (
        <LayoutOne>
            <TopBar />
            <Text as='h3'>Checkout</Text>
            <Steps
                steps={steps}
                active={activeStep}
            />
            {activeStep === 0 ? (
                <div>
                    <br/> <br/>
                    <Table
                        items={cart}
                        columns={columns}
                        perPage={cart.length}
                        showPagination={false}
                    />
                    <br/>
                    <div className="text-right">
                        <Text as='h4'>Subtotal: {formatRupiah(sumPrice(cart))}</Text>
                        <br/>
                        <Button
                            color='red'
                            iconAfter={<FaArrowRight />}
                            onClick={() => setActiveStep(activeStep + 1)}
                        >
                            Selanjutnya
                        </Button>
                    </div>
                </div>
            ): null}
            {activeStep === 1 ? (
                <div>
                    <br/><br/>
                    <Table
                        items={data}
                        columns={addressColums}
                        perPage={limit}
                        page={page}
                        onPageChange={page => setPage(page)}
                        totalItems={count}
                        isLoading={status === 'process'}
                        selectable
                        primaryField='_id'
                        selectedRow={selectedAddress}
                        onSelectRow={item => setSelectedAddress(item)}
                    />
                    {!data.length && status === 'success' ? (
                        <div className='text-center my-10'>
                            <Link to='/alamat-pengiriman/tambah'>
                                Kamu belum memiliki alamat pengiriman <br/><br/>
                                <Button>Tambah alamat</Button>
                            </Link>
                        </div>
                    ) : null}
                    <br/><br/>
                    <Responsive desktop={2} tablet={2} mobile={2}>
                        <div>
                            <Button
                                color='gray'
                                iconBefore={<FaArrowLeft />}
                                onClick={() => setActiveStep(activeStep - 1)}
                            >
                                Sebelumnya
                            </Button>
                        </div>
                        <div className="text-right">
                            <Button
                                color='red'
                                iconAfter={<FaArrowRight />}
                                disabled={!selectedAddress}
                                onClick={() => setActiveStep(activeStep + 1)}
                            >
                                Selanjutnya
                            </Button>
                        </div>
                    </Responsive>
                </div>
            ) : null}
            {activeStep === 2 ? (
                <div>
                    <Table
                        columns={confirmColumns}
                        items={[
                            {label: 'Alamat', value: (<div>
                                    {selectedAddress.nama_alamat} <br/>
                                    {selectedAddress.provinsi}, {selectedAddress.kabupaten}, {selectedAddress.kecamatan},
                                    {selectedAddress.kelurahan} <br/> {selectedAddress.detail_alamat}
                                </div>)
                            },
                            {label: 'Subtotal', value: formatRupiah(sumPrice(cart))},
                            {label: 'Ongkir', value: formatRupiah(config.global_ongkir)},
                            {
                                label: 'Total',
                                value: (<b>{formatRupiah(sumPrice(cart) + parseInt(config.global_ongkir))}</b>)
                            }
                        ]}
                        showPagination={false}
                    />
                    <br/>
                    <Responsive desktop={2} tablet={2} mobile={2}>
                        <div>
                            <Button
                                color='gray'
                                iconBefore={<FaArrowLeft />}
                                onClick={() => setActiveStep(activeStep - 1)}
                            >
                                Sebelumnya
                            </Button>
                        </div>
                        <div className="text-right">
                            <Button
                                color='red'
                                size='large'
                                iconBefore={<FaRegCheckCircle />}
                                onClick={handleCreator}
                            >
                                Bayar
                            </Button>
                        </div>
                    </Responsive>
                </div>
            ) : null}

        </LayoutOne>

    )
}