import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import HomeAdmin from './components/admin/HomeAdmin'
import UpdateAdminJob from './components/admin/UpdateAdminJob'
import CompleteProfile from './components/auth/CompleteProfile'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import useGetAllJobs from './hooks/useGetAllJobs'
import VerifyEmail from './components/auth/VerifyEmail'
import UpdatePassword from './components/UpdatePassword'
import UpdateProfile from './components/UpdateProfile'
import AdminRoute from './components/admin/AdminRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './components/ForgotPassword'
import PreProccessOfFP from './components/PreProccessOfFP'


const appRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/description/:id", element: <JobDescription /> },
  { path: "/browse", element: <Browse /> },
  { path: "/reset-password", element: <PreProccessOfFP /> },
  { path: "/reset-password/:token", element: <ForgotPassword /> },
  { path: "/completeProfile", element: <CompleteProfile /> },
  {
    element: <ProtectedRoute />, 
    children: [
      { path: "/profile", element: <Profile /> },
      { path: "/update-profile", element: <UpdateProfile /> },
      { path: "/update-password", element: <UpdatePassword /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/verify-email-token", element: <VerifyEmail /> }
    ]
  },
  // admin ke liye yha se start hoga
  {
    element: <AdminRoute />,
    children: [
      { path: "/admin/homeadmin", element: <HomeAdmin /> },
      { path: "/admin/companies", element: <Companies /> },
      { path: "/admin/companies/create", element: <CompanyCreate /> },
      { path: "/admin/companies/:id", element: <CompanySetup /> },
      { path: "/admin/jobs", element: <AdminJobs /> },
      { path: "/admin/jobupdate/:id", element: <UpdateAdminJob /> },
      { path: "/admin/jobs/create", element: <PostJob /> },
      { path: "/admin/jobs/:id/applicants", element: <Applicants /> }
    ]
  },

])
function App() {
  useGetCurrentUser()
  return (
    <div className='bg-gray-50 max-h-full'>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
