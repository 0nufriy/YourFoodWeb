import React from 'react'
import './user.css'
import {register} from "../http"
import LocalizedStrings from 'react-localization';

let stringsText = new LocalizedStrings({
  en:{
    Login:"Login:",
    Password:"Password:",
    RePassword:"Re-enter password:",
    Name:"Name:",
    Email: "Email:",
    Phone: "Phone:",
    Register: "Register",
    Cancel: "Cancel",
    ErrorUniq: "Login, Email or Phone already registered",
    ErrorPassword: "Passwords are not the same",
    ErrorName: "Name should be longer than 3 characters",
    ErrorEmail: "Incorrect Email format",
    ErrorPhone: "Incorrect Phone format",
    ErrorLogin: "Login should be longer than 3 characters"
  },
  uk: {
    Login:"Логін:",
    Password:"Пароль:",
    RePassword:"Повторити пароль:",
    Name:"Ім'я",
    Email: "Е-пошта",
    Phone: "Телефон",
    Register: "Готово",
    Cancel: "Відміна",
    ErrorUniq: "Логін, Телефона або Пошта вже зареестровані",
    ErrorPassword: "Паролі не однакові",
    ErrorName: "Ім'я повинно бути довшим за 3 символи",
    ErrorEmail: "Невірний формат Пошти",
    ErrorPhone: "Невірний формат Телефону",
    ErrorLogin: "Логін повинен бути довшим за 3 символи"
  }
 });

const RegisterAdmin = ({ModaleState,langueState}) => {

  stringsText.setLanguage(langueState)
  const [state, setState] = React.useState({
    loginInput: "register",
    PasswordInput: "register",
    NameInput: "register",
    EmailInput: "register",
    PhoneInput: "register",
    errormessage: " "
  })


  let LoginField  = React.createRef();
  let PasswordField  = React.createRef();
  let RePasswordField  = React.createRef();
  let NameField = React.createRef();
  let EmailField = React.createRef();
  let PhoneField = React.createRef();
  function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(email) {
    var re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
    return re.test(String(email).toLowerCase());
  }

  function toRegister(){
    let logint  = LoginField.current.value;
    let passwordt  = PasswordField.current.value;
    let repaswordt  = RePasswordField.current.value;
    let namet = NameField.current.value;
    let emailt = EmailField.current.value;
    let phonet = PhoneField.current.value;
    if(logint.length < 3){
      setState({errormessage: stringsText.ErrorLogin, loginInput: "registererror",
      PasswordInput: "register",
      NameInput: "register",
      EmailInput: "register",
      PhoneInput: "register",})
      return;
    }
    if(passwordt != repaswordt || passwordt == ""){
      setState({errormessage: stringsText.ErrorPassword, loginInput: "register",
      PasswordInput: "registererror",
      NameInput: "register",
      EmailInput: "register",
      PhoneInput: "register",})
      return;
    }
    if(namet.length < 3){
      setState({errormessage: stringsText.ErrorName, loginInput: "register",
      PasswordInput: "register",
      NameInput: "registererror",
      EmailInput: "register",
      PhoneInput: "register",})
      return;
    }
    
    if(!validateEmail(emailt)){
      setState({errormessage: stringsText.ErrorEmail, loginInput: "register",
      PasswordInput: "register",
      NameInput: "register",
      EmailInput: "registererror",
      PhoneInput: "register",})
      return;
    }
    if(!validatePhone(phonet)){
      setState({errormessage: stringsText.ErrorPhone, loginInput: "register",
      PasswordInput: "register",
      NameInput: "register",
      EmailInput: "register",
      PhoneInput: "registererror",})
      return;
    }
    register({
      "login": logint,
      "name": namet,
      "password": passwordt,
      "email": emailt,
      "phone": phonet,
      "role": "Admin"
    }).then(response =>{
        if(response == 200){
          ModaleState(false)
        }else{
          setState({errormessage: "Login, Email or Phone already registered", loginInput: "registererror",
          PasswordInput: "register",
          NameInput: "register",
          EmailInput: "registererror",
          PhoneInput: "registererror",})
        }
    })
  }

  return (
    <div className= 'RegisterModal'>
      <div className= 'RegisterModalBorder'>
        <div className = "TextUpField">
          {stringsText.Login}
        </div>
        <div className = "TextField">
          <input name = {state.loginInput} ref = {LoginField}></input>
        </div>
        <div className = "TextUpField">
        {stringsText.Password}
        </div>
        <div className = "TextField">
          <input name = {state.PasswordInput} type="password" ref = {PasswordField}></input>
        </div>
        <div className = "TextUpField">
        {stringsText.RePassword}
        </div>
        <div className = "TextField">
          <input name = {state.PasswordInput} type="password" ref = {RePasswordField}></input>
        </div>
        <div className = "TextUpField">
        {stringsText.Name}
        </div>
        <div className = "TextField">
          <input name = {state.NameInput} ref = {NameField}></input>
        </div>
        <div className = "TextUpField">
        {stringsText.Email}
        </div>
        <div className = "TextField">
          <input name = {state.EmailInput} ref = {EmailField}></input>
        </div>
        <div className = "TextUpField">
        {stringsText.Phone}
        </div>
        <div className = "TextField">
          <input name = {state.PhoneInput} ref = {PhoneField}></input>
        </div>
        <div className = "errormesage" style={{color: state.color}}>
              {state.errormessage}
            </div>
            <div className='buttondiv'>
              <button  type='submit' name = "Register" onClick={toRegister} >{stringsText.Register}</button>
              <button  type='cancel' name = "Cancel" onClick={()=> {ModaleState(false)}}>{stringsText.Cancel}</button>
            </div>
      </div>
    </div>
  )
}

export default RegisterAdmin
