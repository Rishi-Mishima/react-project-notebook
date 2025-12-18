// path component 
import Layout from "@pages/Layout";
import New from "@pages/New";
import Year from "@pages/Year";
import Month from "@pages/Month";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'year',
                element: <Year />
            },
            {
                index: true,
                element: <Month />
            }
        ]
    },
    {
        path: '/NEW',
        element: <New />
    }
])

export default router