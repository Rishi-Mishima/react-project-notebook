// import { TabBar } from "antd-mobile"
// import { useEffect } from "react"
// import { Outlet, useNavigate } from "react-router-dom"
// import { useDispatch } from 'react-redux'
// import { getBillList } from "../../store/modules/billStore";
// import './index.scss'
// import {
//     BillOutline,
//     CalculatorOutline,
//     AddCircleOutline
// } from 'antd-mobile-icons'

// const tabs = [
//     {
//         key: '/month',
//         title: '月度账单',
//         icon: <BillOutline />,
//     },
//     {
//         key: '/new',
//         title: '记账',
//         icon: <AddCircleOutline />,
//     },
//     {
//         key: '/year',
//         title: '年度账单',
//         icon: <CalculatorOutline />,
//     },
// ]

// const Layout = () => {
//     const dispatch = useDispatch()
//     useEffect(() => {
//         dispatch(getBillList())
//     }, [dispatch])

//     const navigate = useNavigate();
//     const switchoRoute = (path) => {
//         console.log(path)
//         navigate(path)
//     }
//     return (
//         <div className="layout">
//             <div className="container">
//                 <Outlet />
//             </div>
//             <div className="footer">
//                 <TabBar onChange={switchoRoute}>
//                     {tabs.map(item => (
//                         <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
//                     ))}
//                 </TabBar>
//             </div>
//         </div>
//     )
// }

// export default Layout

import { TabBar } from "antd-mobile"
import { useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { getBillList } from "../../store/modules/billStore"
import './index.scss'

import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from 'antd-mobile-icons'

const tabs = [
    {
        key: '/month',
        title: '月度账单',
        icon: <BillOutline />,
    },
    {
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline />,
    },
    {
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline />,
    },
]

const Layout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    // 初始化获取全局账单数据
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    // TabBar 切换时跳转路由
    const onTabChange = (key: string) => {
        navigate(key)
    }

    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>

            <div className="footer">
                <TabBar
                    activeKey={location.pathname}
                    onChange={onTabChange}
                >
                    {tabs.map(item => (
                        <TabBar.Item
                            key={item.key}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout
