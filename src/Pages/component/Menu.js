import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import "./Menu.css"

import LocalizedStrings from 'react-localization';
let stringsText = new LocalizedStrings({
  en:{
    Orders:"Orders",
    Users:"Users",
    Fridges:"Fridges",
    Exit:"Exit"
  },
  uk: {
    Orders:"Замов.",
    Users:"Корист.",
    Fridges:"Комірк.",
    Exit:"Вихід"
  }
 });

const Menu = ({authenticated, isAuthorizetion, indexActive, langueState}) => {
  
    
    if(!authenticated){
      return <Navigate to= "/login"></Navigate>
    }
    stringsText.setLanguage(langueState)
  
    function unLogin(){
      isAuthorizetion();
    }
    
    
    
    return (
      <div>
        <div className='UpMenu'>
          <div className='Logo'>
            YourFood
          </div>
          <div className='buttons'>
            <Link to={'/orders'}><button name = {indexActive == 1 ? 'Selected' :'Unselected'}>{stringsText.Orders} </button></Link>
            <Link to={'/users'}><button name = {indexActive == 2 ? 'Selected' :'Unselected'}>{stringsText.Users} </button></Link>
            <Link to= {'/fridges'}><button name = {indexActive == 3 ? 'Selected' :'Unselected'}>{stringsText.Fridges}</button></Link>   
          </div>
          <div className='exit'>
            <button name = "exit" onClick={unLogin}>{stringsText.Exit}</button>
          </div>
        </div>
  
      </div>
  )
}

export default Menu
