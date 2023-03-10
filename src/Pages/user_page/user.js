import React from 'react'
import Menu from '../component/Menu'
import UserTable from './userTable'
import './user.css'
import LocalizedStrings from 'react-localization';
import { Navigate} from 'react-router-dom'


import RegisterAdmin from './RegisterAdmin';

let stringsText = new LocalizedStrings({
  en:{
    Register:"Register new administrator"
    
  },
  uk: {
    Register:"Зарееструвати нового адміністратора"
  }
 });
const User = ({authenticated, isAuthorizetion,langueState}) => {
 
  stringsText.setLanguage(langueState)

  const [RegisteModal, setModal] = React.useState(false)


  if(!authenticated){
    return <Navigate to= "/login"></Navigate>
  }

  return (
    
    <div>
       <Menu isAuthorizetion={isAuthorizetion} indexActive={2} langueState = {langueState}></Menu>
       <div>
       <button name='registerAdmin' onClick={() =>{setModal(true)}}>{stringsText.Register}</button>
       </div>
       {RegisteModal ? <RegisterAdmin ModaleState = {setModal} langueState={langueState}></RegisterAdmin> : null}
       
       <UserTable modal={RegisteModal} langueState={langueState}></UserTable>
       
    </div>
  )
}

export default User
