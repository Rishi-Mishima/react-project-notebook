import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import router from '@router/index'

import { Provider } from 'react-redux'
import store from './store/index.tsx'

// 定制主题
import './theme.css'

createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>

)
