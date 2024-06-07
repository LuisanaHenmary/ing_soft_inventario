import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout"
import App from "../App"

 const router = createBrowserRouter([
    { path: '/',
        element: <Layout />,
        children : [
            { path: '/child', element: <App />, },
 
        ]
    }
])

export default router