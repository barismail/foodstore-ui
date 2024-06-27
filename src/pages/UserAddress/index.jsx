import {useAddressData} from "../../hooks/address.jsx";
import {Button, LayoutOne, Table, Text} from "upkit";
import TopBar from "../../components/TopBar/index.jsx";
import {Link} from "react-router-dom";

export default function UserAddress() {
    const {
        data,
        count,
        status,
        page,
        setPage,
        limit
    } = useAddressData();

    const columns = [
        {Header: 'Nama', accessor: alamat => (<div><b>{alamat.nama_alamat}</b></div>)},
        {Header: 'Detail', accessor: alamat => {
            return <div>
                {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan}, {alamat.kelurahan}
                <br/> {alamat.detail_alamat}
            </div>
            }},
    ]

    return (
        <LayoutOne size='large'>
            <div>
                <TopBar />
                <Text as='h3'>Alamat pengiriman</Text>
                <br/>
                <div>
                    <Link to='/alamat-pengiriman/tambah'>
                        <Button>
                            Tambah Baru
                        </Button>
                    </Link>
                </div>
                <Table
                    items={data}
                    columns={columns}
                    totalItems={count}
                    page={page}
                    isLoading={status === 'process'}
                    perPage={limit}
                    onPageChange={page => setPage(page)}
                />
            </div>
            {status === 'success' && !data.length ?
                <div className='text-center p-10'>
                Kamu belum menambahkan alamat pengiriman. <br/>
                <Link to='/alamat-pengiriman/tambah'>
                    <Button>Tambah Baru</Button>
                </Link>
                </div> : null
            }
        </LayoutOne>
    )
}