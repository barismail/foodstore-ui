import {arrayOf, string, shape, oneOfType, number, func} from 'prop-types';
import {Button, CardItem, Text} from "upkit";
import {config} from "../../config.js";
import {FaArrowRight, FaCartPlus} from '@meronex/icons/fa';
import {sumPrice} from "../../utils/sum-price.js";
import {formatRupiah} from "../../utils/format-rupiah.js";

export default function Cart({items, onItemInc, onItemDec, onCheckOut}) {
    const total = sumPrice(items)

    return <div>
        <div className="px-2 border-b mt-5 pb-5">
            <div className="text-3xl flex items-center text-red-700">
                <FaCartPlus />
                <div className="ml-2">
                    Keranjang
                </div>
            </div>
            <Text as="h5">Total: {formatRupiah(total)}</Text>
            <Button
                text="Checkout"
                fitContainer
                iconAfter={<FaArrowRight />}
                disabled={!items.length}
                onClick={onCheckOut}
            />
        </div>
        {items.length ? (
            <div className='text-center text-red-900 text-sm'>
                belum ada items di keranjang
            </div>
            ) : null}
        <div className="p-2">
            {items.map((item, index) => (
                <div key={index} className='mb-2'>
                    <CardItem
                        imgUrl={`${config.api_host}/upload/${item.image_url}`}
                        name={item.name}
                        qty={item.qty}
                        color='orange'
                        onInc={() => onItemInc(item)}
                        onDec={() => onItemDec(item)}
                    />
                </div>
            ))}
        </div>
    </div>
}

Cart.propTypes = {
    items: arrayOf(shape({
        _id: string.isRequired,
        name: string.isRequired,
        qty: oneOfType([string, number]).isRequired
    })),
    onItemInc: func,
    onItemDec: func,
    onCheckOut: func,
}