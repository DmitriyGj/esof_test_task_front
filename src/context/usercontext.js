import {createContext} from "react";
import { useCookies } from 'react-cookie';
export const UserContext = createContext(null)

export const UserProvider = ({children}) => {
    const [cookies, setCookies, removeCookie] = useCookies(['user']);
    
    const loginUser = (user) => {
        setCookies('user',user);
    } 

    const logoutUser = () =>{
        removeCookie('user')
    }

    return(<UserContext.Provider value = {{user:cookies.user, loginUser, logoutUser}}>
        {children}
    </UserContext.Provider>)
}
