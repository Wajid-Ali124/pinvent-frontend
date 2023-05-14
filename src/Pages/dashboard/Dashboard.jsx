import { useDispatch, useSelector } from 'react-redux'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { selectIsloggedIn } from '../../redux/features/auth/authSlice'
import { getProducts } from '../../redux/features/product/productSlice'
import { useEffect } from 'react'
import ProductList from '../../components/product/productList/ProductList'
import ProductSummary from '../../components/product/productSummary/ProductSummary'


const Dashboard = () => {
    useRedirectLoggedOutUser("/login")
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsloggedIn)
    const { products, isLoading, isError, message } = useSelector((state) => state.product)

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProducts())
        }

        if (isError) {
            console.log(message);
        }

    }, [isLoggedIn, isError, message, dispatch])


    return (
        <div>
            <ProductSummary products={products} />
            <ProductList products={products} isLoading={isLoading} />
        </div>
    )
}

export default Dashboard
