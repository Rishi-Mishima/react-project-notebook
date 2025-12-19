// 账单列表相关的Store
import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import type { AppDispatch } from "store";

const billStore = createSlice({
    name: 'bill',
    // 数据状态
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        }
    }
})

// 结构action Creater函数
const { setBillList } = billStore.actions


// 编写异步
const getBillList = () => {
    return async (dispatch: AppDispatch) => {
        // 编写异步请求
        const res = await axios.get('http://localhost:3001/ka')
        // 触发同步 reducer
        dispatch(setBillList(res.data))
    }
}
export { getBillList }

// 导出reducer
const reducer = billStore.reducer

export default reducer 