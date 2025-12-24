import { useState } from 'react'
import { Button, Input, Radio, Toast } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './index.scss'

const New = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // 1️⃣ 表单状态
    const [type, setType] = useState<'pay' | 'income'>('pay')
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('餐饮')

    // 2️⃣ 提交处理
    const onSubmit = () => {
        if (!amount) {
            Toast.show({ content: '请输入金额' })
            return
        }

        // 👉 这里先模拟提交
        const newBill = {
            id: Date.now(),
            type,
            amount: Number(amount),
            category,
            date: new Date().toISOString(),
        }

        console.log('新账单：', newBill)

        Toast.show({ content: '记账成功' })

        // 3️⃣ 跳回月度账单页
        navigate('/month')
    }

    return (
        <div className="new">
            <h2 className="title">记一笔</h2>

            {/* 收支类型 */}
            <div className="form-item">
                <div className="label">类型</div>
                <Radio.Group value={type} onChange={val => setType(val)}>
                    <Radio value="pay">支出</Radio>
                    <Radio value="income">收入</Radio>
                </Radio.Group>
            </div>

            {/* 金额 */}
            <div className="form-item">
                <div className="label">金额</div>
                <Input
                    placeholder="请输入金额"
                    type="number"
                    value={amount}
                    onChange={val => setAmount(val)}
                />
            </div>

            {/* 分类 */}
            <div className="form-item">
                <div className="label">分类</div>
                <Input
                    placeholder="例如：餐饮 / 交通 / 工资"
                    value={category}
                    onChange={val => setCategory(val)}
                />
            </div>

            {/* 提交 */}
            <Button
                block
                color="primary"
                size="large"
                onClick={onSubmit}
            >
                保存
            </Button>
        </div>
    )
}

export default New
