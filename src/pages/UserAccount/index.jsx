import {Card, LayoutOne, Responsive, Text} from "upkit";
import TopBar from "../../components/TopBar";
import IconWrapper from "../../components/IconWrapper";
import {FaAddressBook, FaArrowRight, FaFileInvoice, FaHome} from "@meronex/icons/fa";
import {Link} from "react-router-dom";

const menus = [
    {label: 'Beranda', icon: (
        <IconWrapper>
            <div className='text-white text-5xl flex justify-center mb-5'>
                <FaHome />
            </div>
        </IconWrapper>
        ), url: '/'},
    {label: 'Alamat', icon: (
        <IconWrapper>
            <div className='text-white text-5xl flex justify-center mb-5'>
                <FaAddressBook />
            </div>
        </IconWrapper>
        ), url: '/alamat-pengiriman'},
    {label: 'Pesanan', icon: (
            <IconWrapper>
                <div className='text-white text-5xl flex justify-center mb-5'>
                    <FaFileInvoice/>
                </div>
            </IconWrapper>
        ), url: '/pesanan'},
    {label: 'Logout', icon: (
        <IconWrapper>
            <div className='text-white text-5xl flex justify-center mb-5'>
                <FaArrowRight />
            </div>
        </IconWrapper>
        ), url: '/logout'},
]

export default function UserAccount() {
    return (
        <LayoutOne>
            <TopBar/>
            <Text as='h3'>Akun anda</Text>
            <br/>
            <Responsive desktop={4} tablet={4} mobile={2}>
                {menus.map((menu, idx) => (
                    <div key={idx} className='px-2 pb-2'>
                        <Link to={menu.url}>
                            <Card
                                header={menu.icon}
                                body={<div className='text-center font-bold text-white'>{menu.label}</div>}
                            />
                        </Link>
                    </div>
                ))}
            </Responsive>
        </LayoutOne>
    )
}