import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListUser from './pages/ListUser'
import DetailList from './pages/DetailList'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListUser />} />
        <Route path='/details/:id' element={<DetailList />} />
      </Routes>
    </BrowserRouter>

  )
}
