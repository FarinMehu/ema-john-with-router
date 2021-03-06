import React from 'react';
import { useHistory } from 'react-router';
import useCart from '../../Hooks/useCarts';
import useProducts from '../../Hooks/useProducts';
import { clearTheCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const OrderReview = () => {
    //will import useProducts function from Hooks.js 
    const [products] = useProducts();
    //will import useCart function
    const [cart, setCart] = useCart(products);
    const history = useHistory();

    const handleRemove = key => {
        // console.log(key);
        const newCart = cart.filter(product => product.key !== key);
        setCart(newCart);
        removeFromDb(key);
    };

    const handlePlaceOrder = () => {
        history.push('/placeorder');
        setCart([]);
        clearTheCart();
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem
                        key={product.key}
                        product={product}
                        handleRemove={handleRemove}></ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    {/* <p>Hello world</p> */}
                    <button onClick={handlePlaceOrder} className='btn-regular'>Place order</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;