import { useMemo, useState } from 'react'
import { Button, DatePicker, Input, Radio, Toast } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import type { AppDispatch } from '@/store' // 你 store 里要导出 AppDispatch
import { addBill, getBillList } from '@/store/modules/billStore'
import './index.scss'

type BillType = 'pay' | 'income'

const PAY_CATEGORIES = ['餐饮', '交通', '购物', '住房', '娱乐', '医疗']
const INCOME_CATEGORIES = ['工资', '奖金', '理财', '兼职', '报销', '其他']

const New = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    // 业务字段
    const [type, setType] = useState<BillType>('pay')
    const [amount, setAmount] = useState('') // 仍然用 string，方便输入过程
    const [category, setCategory] = useState('餐饮')
    const [date, setDate] = useState<Date>(new Date())
    const [pickerVisible, setPickerVisible] = useState(false)

    // 交互状态
    const [submitting, setSubmitting] = useState(false)

    const categories = useMemo(() => {
        return type === 'pay' ? PAY_CATEGORIES : INCOME_CATEGORIES
    }, [type])

    // 切换类型时，自动切换默认分类（更像真实 app）
    const onTypeChange = (val: BillType) => {
        setType(val)
        setCategory(val === 'pay' ? '餐饮' : '工资')
    }

    // 金额输入：只允许数字和最多一位小数点，并限制两位小数
    const onAmountChange = (val: string) => {
        // 去掉空格
        const v = val.replace(/\s/g, '')

        // 只允许 0-9 和 .
        if (!/^[0-9.]*$/.test(v)) return

        // 只允许一个小数点
        const dotCount = (v.match(/\./g) || []).length
        if (dotCount > 1) return

        // 限制两位小数
        if (v.includes('.')) {
            const [intPart, decPart] = v.split('.')
            if (decPart.length > 2) return
            // 允许 "0." 这种输入过程
            setAmount(intPart === '' ? `0.${decPart}` : `${intPart}.${decPart}`)
            return
        }

        // 避免超长（防止用户粘贴超大数）
        if (v.length > 10) return
        setAmount(v)
    }

    const validate = () => {
        if (!amount) return '请输入金额'
        if (amount === '.') return '金额格式不正确'
        const num = Number(amount)
        if (!Number.isFinite(num)) return '金额格式不正确'
        if (num <= 0) return '金额必须大于 0'
        if (!category) return '请选择分类'
        return null
    }

    const onSubmit = async () => {
        if (submitting) return

        const err = validate()
        if (err) {
            Toast.show({ content: err })
            return
        }

        try {
            setSubmitting(true)

            const newBill = {
                id: Date.now(),
                type,
                amount: Number(amount),
                category,
                date: date.toISOString(),
            }

            // ✅ 1) 先写入本地 store（立刻有反馈）
            dispatch(addBill(newBill))

            // ✅ 2) 如果你的数据源是 json-server（真实业务是要 POST）
            // 你现在还没做 POST 接口的话，先用“刷新列表”模拟一致性
            // dispatch(getBillList())

            Toast.show({ content: '记账成功' })
            navigate('/month')
        } catch (e) {
            Toast.show({ content: '保存失败，请重试' })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="new">
            <h2 className="title">记一笔</h2>

            {/* 类型 */}
            <div className="form-item">
                <div className="label">类型</div>
                <Radio.Group value={type} onChange={onTypeChange}>
                    <Radio value="pay">支出</Radio>
                    <Radio value="income">收入</Radio>
                </Radio.Group>
            </div>

            {/* 金额 */}
            <div className="form-item">
                <div className="label">金额</div>
                <Input
                    placeholder="请输入金额"
                    inputMode="decimal"
                    value={amount}
                    onChange={onAmountChange}
                    clearable
                />
            </div>

            {/* 分类：网格按钮（业务感强） */}
            <div className="form-item">
                <div className="label">分类</div>
                <div className="cat-grid">
                    {categories.map((c) => (
                        <button
                            key={c}
                            type="button"
                            className={`cat ${category === c ? 'active' : ''}`}
                            onClick={() => setCategory(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* 日期 */}
            <div className="form-item">
                <div className="label">日期</div>
                <button className="date-btn" type="button" onClick={() => setPickerVisible(true)}>
                    {date.getFullYear()}-{String(date.getMonth() + 1).padStart(2, '0')}-{String(date.getDate()).padStart(2, '0')}
                </button>

                <DatePicker
                    visible={pickerVisible}
                    onClose={() => setPickerVisible(false)}
                    value={date}
                    onConfirm={(v) => {
                        setDate(v)
                        setPickerVisible(false)
                    }}
                    max={new Date()}
                    title="选择日期"
                />
            </div>

            {/* 提交 */}
            <Button
                block
                color="primary"
                size="large"
                loading={submitting}
                disabled={submitting}
                onClick={onSubmit}
            >
                保存
            </Button>
        </div>
    )
}

export default New
