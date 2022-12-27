import React, { useState } from 'react';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import './App.css';
import LoginPage from './Pages/login_page/login'
import FridgePage from './Pages/fridge_page/fridge'
import OrderPage from './Pages/order_page/order'
import UserPage from './Pages/user_page/user'


function App() {
  
  document.body.style.backgroundColor = "#FFEDED"
  const [userState,setUserState] = useState({
    authenticated: false,
    currentUser: "None",
    User: false,
    Fridge: false,
    Order: false
    });

  const [state, setState] = useState("en")

  const isAuthorizetion =() =>{
    setUserState({userState,authenticated: !userState.authenticated})
  }
  return (
    <div>
      
      <BrowserRouter>
      <Routes>
        <Route index path='/login' element={
          <div className="loginoverlay">
            <LoginPage authenticated={userState.authenticated} isAuthorizetion = {isAuthorizetion} langueState = {state} langueStateSet = {setState}/>  
          </div>
        }>
        </Route>
        
        <Route index path='*' element={<Navigate to= "/login"></Navigate>}></Route>
        
        <Route index path='/orders' element={
        <OrderPage authenticated={userState.authenticated} isAuthorizetion = {isAuthorizetion} langueState = {state}/>
        }></Route>
        <Route index path='/users' element={<UserPage authenticated={userState.authenticated} isAuthorizetion = {isAuthorizetion} User = {userState.User} Fridge = {userState.Fridge} langueState = {state}/>}></Route>
        <Route index path='/fridges' element={<FridgePage authenticated={userState.authenticated} isAuthorizetion = {isAuthorizetion} langueState = {state}/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
