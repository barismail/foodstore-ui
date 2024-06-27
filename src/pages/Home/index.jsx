import React from 'react'
import {
    fetchProducts,
    setPage,
    goToNextPage,
    goToPrevPage,
    setKeyword,
    setCategory,
    toggleTag,
} from '../../features/Products/actions.js'
import {SideNav, LayoutSidebar, Responsive, CardProduct, Pagination, InputText, Pill} from 'upkit'
import menus from './menus.js'
import TopBar from '../../components/TopBar'
import {useDispatch, useSelector} from "react-redux"
import {config} from '../../config.js'
import {BounceLoader} from 'react-spinners'
import {tags} from './tags.js'
import Cart from "../../components/Cart";
import {addItem, removeItem} from "../../features/Cart/actions.js"
import {useNavigate} from 'react-router-dom'

export default function Home() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();


    React.useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch, products.currentPage, products.keyword, products.category, products.tags])

    return (
        <LayoutSidebar
            sidebar={
            <SideNav
                items={menus}
                verticalAlign="top"
                activeClassName={products.category}
                onChange={category => dispatch(setCategory(category))}
            />}
            content={
                <div className='md:flex md:flex-row-reverse w-full h-full min-h-screen mr-5'>
                    <div className='w-full md:w-3/4 pl-5 pb-10'>
                        <TopBar />
                        <div className="w-full text-center mb-10 mt-5">
                            <InputText
                                fullRound
                                value={products.keyword}
                                placeholder='cari makanan favoritmu'
                                fitContainer
                                onChange={(e) => dispatch(setKeyword(e.target.value))}
                            />
                        </div>
                        {tags[products.category].length > 0 && (
                            <div className="mb-5 pl-2 flex w-3/3 overflow-auto pb-5">
                                {tags[products.category].map((tag, idx) => (
                                    <div key={idx}>
                                        <Pill
                                            text={tag}
                                            icon={tag.slice(0, 1).toUpperCase()}
                                            isActive={products.tags.includes(tag)}
                                            onClick={() => dispatch(toggleTag(tag))}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {products.status === 'process' && !products.data.length ? (
                            <div className='flex justify-center'>
                                <BounceLoader color="red"/>
                            </div>
                        ) : null}
                        <Responsive desktop={3} items='stretch'>
                            {products.data.map((product, idx) => (
                                <div key={idx} className='p-2'>
                                    <CardProduct
                                        title={product.name}
                                        imgUrl={`${config.api_host}/upload/${product.image_url}`}
                                        price={product.price}
                                        onAddToCart={() => dispatch(addItem(product))}
                                    />
                                </div>
                            ))}
                        </Responsive>
                        <div className="text-center my-10">
                            <Pagination
                                totalItems={products.totalItems}
                                page={products.currentPage}
                                perPage={products.perPage}
                                onChange={(page) => dispatch(setPage(page))}
                                onNext={() => dispatch(goToNextPage())}
                                onPrev={() => dispatch(goToPrevPage())}
                            />
                        </div>
                    </div>
                    <div className='w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100'>
                        <Cart
                            items={cart}
                            onItemDec={item => dispatch(removeItem(item))}
                            onItemInc={item => dispatch(addItem(item))}
                            onCheckOut={() => navigate('/checkout', {replace: true})}
                        />
                    </div>
                </div>
            }
            sidebarSize={80}
        />
    )
}