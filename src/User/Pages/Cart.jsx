// import React from 'react'

// function Cart() {
//   return (
//     <div className='container'>
//         <div className='text-center my-5'>
// <h2>Cart</h2>
// <small className='text-secondary'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae facere cupiditate nihil accusamus quidem temporibus minus voluptate debitis at, voluptatem natus adipisci nisi recusandae nemo ducimus quisquam nam pariatur distinctio?</small>
// </div>
//       <div className='p-5 rounded bg-dark'>
//         data.map((val,key) ={} 
//       </div>
//     </div>
//   )
// }

// export default Cart
import React, { useContext } from 'react'
import { GlobalContext } from '../../Context/context'
import { decodeToken } from 'react-jwt'
import { CartContext } from '../CartContext/context'
import axios from 'axios'
import Swal from 'sweetalert2'



export default function Cart() {


    const { cart_state, cart_dispatch } = useContext(CartContext)
    console.log(cart_state)

    const { state, dispatch } = useContext(GlobalContext)
    const total = cart_state?.cart?.reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0)
    const user = decodeToken(state.token)
    console.log(user)
    const checkout = () => {
        const payload = {
            order: cart_state.cart,
            totalBill: total,
            customerAddress: "hello 123 Street ABC",
            customerContact: "0900 78601",
            customerName: user.Name,
            customerEmail: user.Email,
            customerId: user._id
        }


        console.log(payload)
        axios.post('/api/place-order', payload)
            .then(json => {
                cart_dispatch({
                    type: "CLEAR_CART"
                })

                Swal.fire({
                    title: 'Success!',
                    text: json.data.message,
                    icon: 'success',
                    confirmButtonText: 'Continue Exploring'
                })

            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="text-center my-5">
                <h2>Cart</h2>
                <small className="text-secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius totam nostrum voluptatibus culpa accusamus.</small>
            </div>

            <div className="p-5 rounded bg-dark">
                {
                    cart_state.cart?.length > 0
                        ? (

                            <>
                                {
                                    cart_state.cart.map((val, key) => <div className="card mb-3 w-100" key={key}>
                                        <div className="row g-0">
                                            <div className="col-md-2 d-flex justify-content-center align-items-center">
                                                <img src={val.thumbnail} style={{ height: '10vh', objectFit: 'contain' }} className="img-fluid rounded-start" alt={val.productName} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{val.productName} - {val.price} {val.priceUnit}</h5>
                                                    <p className="card-text">{val.description}
                                                    </p>
                                                    <p className="card-text">
                                                        <small className="text-body-secondary">Quantity : {val.quantity}</small>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <h5 className="card-title text-center pt-5">{val.quantity * val.price}</h5>
                                            </div>
                                        </div>
                                    </div>)
                                }

                                <div className="text-center text-white d-flex justify-content-around mt-5 border border-white rounded align-items-center py-3">
                                    <h3>Total</h3>
                                    <h3>{total}</h3>
                                </div>

                                <button className="btn btn-light mt-5 w-100 d-block" onClick={checkout}>Checkout</button>
                            </>




                        )
                        : (<div className='fs-1  my-5  text-center text-white'>No Items in the Cart</div>)
                }





            </div>
        </div >
    )
}
