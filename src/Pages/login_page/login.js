import { hasSelectionSupport } from '@testing-library/user-event/dist/utils'
import React,{ useState } from 'react'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import './login.css'
import {login} from "../http"

import LocalizedStrings from 'react-localization';

let stringsText = new LocalizedStrings({
 en:{
   login:"Login:",
   password:"Password:",
   loginbutton:"login",
   error:"Incorrect login or password"
 },
 uk: {
  login:"Логін:",
  password:"Пароль:",
  loginbutton:"Увійти",
  error:"Неправильний логін або пароль"
 }
});

const useLoginPage = ({authenticated,isAuthorizetion, langueState, langueStateSet}) => {
  stringsText.setLanguage(langueState);
  console.log(authenticated)
  const [state, setState] = React.useState({
    Textfieldclass: "login",
    errormessage: " " 
  })
  if(authenticated){
    return <Navigate to= "/orders"></Navigate>
  }
  let passwordInput = React.createRef();
  let loginInput = React.createRef();
  function tologin(){
      let logintext = loginInput.current.value;
      let passwordtext = passwordInput.current.value;
      let resu;
      login({
        "login": logintext,
        "password": passwordtext,
        "admin": true
      }).then(response => {
        resu = response.toString();  
        if(resu == 200){
          isAuthorizetion();
        }else{
          setState({Textfieldclass: "error",errormessage: stringsText.error})
        }
      }).catch(error => {
        setState({Textfieldclass: "error",errormessage: error.toString});
    })
      
      
  }

  function chnageLangue(){
    if(langueState == "en"){
      langueStateSet("uk")
    }else{
      langueStateSet("en")
    }
  }

  return (
      <div>
            <div className = "logo">
              Your Food
            </div>
            <div className='buttondiv'>
              <button  type='changelangue' name = "changelangue" onClick={chnageLangue}>{langueState.toUpperCase()}</button>
            </div>
            <div className = "TextUpField">
              {stringsText.login}
            </div>
            <div className = "TextField">
                <input name = {state.Textfieldclass}  ref={loginInput}></input>
            </div>
            <div className = "TextUpField">
            {stringsText.password}
            </div>
            <div className = "TextField">
                <input type= "password" name = {state.Textfieldclass} ref={passwordInput}></input>
            </div>
            <div className = "errormesage" style={{color: state.color}}>
              {state.errormessage}
            </div>
            <div className='buttondiv'>
              <button  type='submit' name = "ApllayLogin1" onClick={tologin}>{stringsText.loginbutton}</button>
            </div>
            
        </div>
      
  )
}

export default useLoginPage
