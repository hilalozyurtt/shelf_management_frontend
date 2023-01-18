import jwtDecode from 'jwt-decode'
import React,{ useReducer, createContext } from "react";
import { Cookie, useCookie  } from 'next-cookie'
// eslint-disable-next-line react-hooks/rules-of-hooks
const cookie = useCookie()
const initialState = {
  user: null
}
const ISSERVER = typeof window === "undefined";

if(!ISSERVER && cookie.get("token")){
  const decodedToken = jwtDecode(cookie.get("token"))
  //@ts-ignore
  if(decodedToken.exp * 1000 < Date.now()){
    cookie.remove("token")
  }
  else{
    //@ts-ignore
    initialState.user = decodedToken
  }
}

const AuthContext = createContext({
  user:null,
  login:(userData: any) => {},
  logout:()=>{}
})

function authReducer(state:any, action:any){
  switch(action.type){
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return{
        ...state,
        user: null
      }  
    default:
      return state  
  }
}

function AuthProvider(props:any){
  const [state, dispatch] = useReducer(authReducer,initialState)
  const login = (userData:any) => {
    //cookie.set("token",userData.token) burası artık serverdan httpOnly ve secure şeklinde yaptım
    dispatch({
      type:'LOGIN',
      payload: userData
    })
  }

  function logout(){
    cookie.remove("token")
    dispatch({type: 'LOGOUT'})
  }
  return (
    <AuthContext.Provider
      value={{user: state.user, login, logout}}
      {...props}
    />
  )
}
export default AuthContext
export {AuthProvider}