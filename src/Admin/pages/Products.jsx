import React, { useState, useEffect } from "react";
// import { BsFillPencilFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import ProductModal from "../components/ProductModal";

export default function Products() {
    const [product, setProducts] = useState([]);

   

    useEffect(() => {
        axios
            .get("http://localhost:3000/products/allProducts")
            .then((json) => setProducts(json.data))
            .catch((error) => console.log(error));
    }, []);

    function deleteProduct(_id) {
        axios
            .delete(`http://localhost:3000/products/deleteProduct/${_id}`)
            .then((response) => {
                if (response.data.success) {
                    setProducts(product.filter(val => val._id !== _id));
                } else {
                    console.error("Error while deleting product.");
                }
            })
            .catch((error) => console.error("Error:", error));
    }



    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center bg-primary p-2 my-3 rounded">
                <span className="fs-4 fw-bold text-white">CATEGORIES</span>
                <ProductModal />
            </div>

            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Category</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Price</th>

                        </tr>
                    </thead>
                    <tbody>
                    {product.map((val, key) => (
                            <tr key={key}>
                                <th scope="row">{val._id}</th>
                                <td>{val.ProductName}</td>
                                <td>
                                    <img
                                        src={val.ProductImage}
                                        className="img-fluid"
                                        style={{ height: "5vh" }}
                                        alt={val.ProductName}
                                    />
                                </td>
                                <td>{val.category}</td>
                                <td>{val.brand}</td>
                                <td>{val.price}</td>


                                <td>
                                    <button
                                        className="btn btn-dark mx-1"
                                        onClick={() => deleteProduct(val._id)}
                                    >
                                        <AiFillDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
