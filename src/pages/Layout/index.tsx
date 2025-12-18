import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"
const Layout = () => {

    return (
        <div>
            <Outlet />
            this is Layout

            {/* 全局生效样式 */}
            <Button color='primary'>global button</Button>
        </div>
    )
}

export default Layout 