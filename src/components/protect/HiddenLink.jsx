import { useSelector } from "react-redux";
import { selectIsloggedIn } from "../../redux/features/auth/authSlice";

export const ShowOnLogin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsloggedIn)

    if (isLoggedIn) {
        return <> {children} </>
    }
    return null
}

export const ShowOnLogout = ({ children }) => {
    const isLoggedIn = useSelector(selectIsloggedIn)

    if (!isLoggedIn) {
        return <> {children} </>
    }
    return null
}

