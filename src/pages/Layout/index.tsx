import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "../../store/modules/billStore";


const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    return (
        <div>
            <Outlet />
            this is Layout

            {/* 全局生效样式 */}
            <Button color='primary'>global button</Button>

            {/* 局部生效样式 */}
            <div className="puple">
                <Button color='success'>local button</Button>
            </div>
        </div>
    )
}

export default Layout 