import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout"
import App from "../App"
import Products from "../Pages/Products"

 const router = createBrowserRouter([
    { path: '/',
        element: <Layout />,
        children : [
            { path: '/child', element: <App />, },
            { path: '/products', element: <Products />, },
        ]
    }
])

export default router