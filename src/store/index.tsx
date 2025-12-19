// 组合子模块，导出store实例
import { configureStore } from "@reduxjs/toolkit";
import billReducer from './modules/billStore'

const store = configureStore({
    reducer: {
        bill: billReducer
    }
})

//  为了解决 Parameter 'dispatch' implicitly has an 'any' type.
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store 