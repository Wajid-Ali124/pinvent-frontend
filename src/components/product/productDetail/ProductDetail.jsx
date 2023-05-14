import React, { useEffect } from 'react'
import "./ProductDetail.scss"
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectIsloggedIn } from '../../../redux/features/auth/authSlice'
import { getProduct } from '../../../redux/features/product/productSlice'
import Card from '../../card/Card'
import { SpinnerImg } from '../../loader/Loader'
import DOMPurify from "dompurify"

const ProductDetail = () => {
    useRedirectLoggedOutUser("/login")
    const dispatch = useDispatch()
    const { id } = useParams();

    const isLoggedIn = useSelector(selectIsloggedIn)
    const { product, isLoading, isError, message } = useSelector((state) => state.product)

    const stockStaus = (quantity) => {
        if (quantity > 0) {
            return <span className="--color-success">In Stock</span>
        }
        return <span className="--color-danger">Out of Stock</span>
    }

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProduct(id))
        }

        if (isError) {
            console.log(message);
        }

    }, [isLoggedIn, isError, message, dispatch])

    return (
        <div className='product-detail'>
            <h3 className="--mt">Product Detail</h3>
            <Card cardClass="card">
                {isLoading && <SpinnerImg />}
                {product && (
                    <div className="detail">
                        <Card cardClass="group">
                            {product?.image ?
                                (<img
                                    src={product.image.filePath}
                                    alt={product.image.fileName} width={"300px"}
                                    style={{ display: "block", margin: "0 auto" }}
                                />) :
                                (<p>No image set for this product</p>)

                            }
                        </Card>
                        <h4>Product Availability: {stockStaus(product.quantity)}</h4>
                        <hr />
                        <h4>
                            <span className="badge">Name: </span> &nbsp; {product.name}
                        </h4>
                        <p>
                            <b>&rarr; SKU: </b> {product.sku}
                        </p>
                        <p>
                            <b>&rarr; Category: </b> {product.category}
                        </p>
                        <p>
                            <b>&rarr; Price: </b> {`$${product.price}`}
                        </p>
                        <p>
                            <b>&rarr; Quantity in Stock: </b> {product.quantity}
                        </p>
                        <p>
                            <b>&rarr; Total Value in Stock: </b> {"$"}{product.price * product.quantity}
                        </p>
                        <hr />
                        <p>
                            <b>&rarr; Description: </b>
                        </p>
                        <div style={{ fontSize: "20px", color: "gray" }} dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(product.description)
                        }}>
                        </div>

                        <hr />
                        <code className="--color-dark">
                            Created On: {product.createdAt.toLocaleString("en-US")}
                        </code>
                        <br />
                        <code className="--color-dark">
                            Last Updated: {product.createdAt.toLocaleString("en-US")}
                        </code>


                    </div>
                )}
            </Card>
        </div>
    )
}

export default ProductDetail
