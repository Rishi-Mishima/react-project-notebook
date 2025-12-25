import { useSelector } from 'react-redux'
import './index.scss'

const Year = () => {
    // 1️⃣ 从 Redux 拿到账单列表
    const billList = useSelector((state: any) => state.bill.billList)

    // 2️⃣ 年度统计
    const totalPay = billList
        .filter(item => item.type === 'pay')
        .reduce((sum, item) => sum + item.amount, 0)

    const totalIncome = billList
        .filter(item => item.type === 'income')
        .reduce((sum, item) => sum + item.amount, 0)

    const balance = totalIncome - totalPay

    return (
        <div className="year">
            <h2 className="title">年度账单</h2>

            <div className="summary">
                <div className="item">
                    <span className="label">年度支出</span>
                    <span className="value pay">￥{totalPay}</span>
                </div>

                <div className="item">
                    <span className="label">年度收入</span>
                    <span className="value income">￥{totalIncome}</span>
                </div>

                <div className="item">
                    <span className="label">年度结余</span>
                    <span className="value balance">￥{balance}</span>
                </div>
            </div>
        </div>
    )
}

export default Year
