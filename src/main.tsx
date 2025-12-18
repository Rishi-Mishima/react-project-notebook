import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import router from '@router/index'

// 定制主题
import './theme.css'

createRoot(document.getElementById('root')!).render(

  <RouterProvider router={router}></RouterProvider>

)
