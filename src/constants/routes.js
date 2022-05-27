import {LoginForm} from '../forms/Login/Login'
import {Tasks} from '../pages/Tasks/Tasks';

export const publicRoutes = [
    {path:'/login', element: <LoginForm />}
]

export const privateRoutes = [
    {path: '/tasks', element: <Tasks/>}
]