import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import PageNotFound from './Components/Common/PageNotFound'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import { ToastContainer } from 'react-toastify'
import { Chat } from './Pages'
import { Authenticate } from './Utils/Authenticate'
import UpdateProfile from './Pages/UpdateProfile'
import ProfileDetails from './Pages/ProfileDetails'
import { ViewUser } from './Pages/ViewUser'

function App() {
  const ProtectedRoute = ({ children }) => {
    const user = Authenticate()
    if (user) {
      return children;
    }
    return <Navigate to={"/signin"} />
  }

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path='/'
            element={
              <Home />
            }>
          </Route>

          <Route
            path='/signup'
            element={
              <SignUp />
            }>
          </Route>

          <Route
            path='/signin'
            element={
              <SignIn />
            }>
          </Route>

          <Route
            path='/user/profile'
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path='/update/:id'
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path='/user/:id'
            element={
              <ProtectedRoute>
                <ProfileDetails />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path='/admin/dashboard'
            element={
              <ProtectedRoute>
                <ViewUser />
              </ProtectedRoute>
            }>
          </Route>

          <Route
            path='/*'
            element={
              <PageNotFound />
            }>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
