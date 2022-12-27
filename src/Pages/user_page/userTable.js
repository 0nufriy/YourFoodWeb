import React from 'react'
import "./user.css"
import {userList} from "../http"
import LocalizedStrings from 'react-localization';

let stringsText = new LocalizedStrings({
  en:{
    Login:"Login",
    Name:"Name",
    FridgeID:"Fridge ID",
    FridgeAdress:"Fridge adress",
    PassID: "Pass ID",
    Email: "Email",
    Phone: "Phone",
    Role: "Role",
    
  },
  uk: {
    Login:"Логін",
    Name:"Ім'я",
    FridgeID:"ІД Холодильника",
    FridgeAdress:"Адресса Холодильника",
    PassID: "ІД підписки",
    Email: "Е-пошта",
    Phone: "Телефон",
    Role: "Роль",
  }
 });

const UserTable = ({modal,langueState}) => {
  stringsText.setLanguage(langueState)

    const [state,setState] = React.useState([{
        login: "Loading...",
        name: "",
        fridgeID: null,
        FridgeAdress: "",
        passID: null,
        email: "",
        phone: "",
        role: ""
      }])
    
      const getUsers = async () =>{
        const getUser = await userList();
        let g = []
        for(let i = 0; i < getUser.length;i++){
          g[i] = {
            login: "",
            name: "",
            fridgeID: null,
            FridgeAdress: "",
            passID: null,
            email: "",
            phone: "",
            role: ""
          }
          g[i].login = getUser[i].login;
          g[i].name = getUser[i].name;
          if(getUser[i].fridgeId !== 0){
            g[i].fridgeID = getUser[i].fridgeId;
          }
          
          g[i].FridgeAdress = getUser[i].adress;
          if(getUser[i].passId !== 0){
            g[i].passID = getUser[i].passId;
          }
          
          g[i].email = getUser[i].email;
          g[i].phone = getUser[i].phone;
          g[i].role = getUser[i].role;
          
        }
        setState(g)
      }
      React.useEffect(()=>{getUsers()},[modal])
  return (
    <div>
      <table>
          <tr>
            <th style={{width: "8%"}}>{stringsText.Login}</th>
            <th style={{width: "8%"}}>{stringsText.Name}</th>
            <th style={{width: "5%"}}>{stringsText.FridgeID}</th>
            <th style={{width: "40%"}}>{stringsText.FridgeAdress}</th>
            <th style={{width: "5%"}}>{stringsText.PassID}</th>
            <th style={{width: "12%"}}>{stringsText.Email}</th>
            <th style={{width: "12%"}}>{stringsText.Phone}</th>
            <th style={{width: "8%"}}>{stringsText.Role}</th>
          </tr>

          {state.map( item => 
          <tr key = {item.login}>
          <td>{item.login}</td>
          <td>{item.name}</td>
          <td style={{textAlign: "center"}}>{item.fridgeID}</td>
          <td>{item.FridgeAdress}</td>
          <td style={{textAlign: "center"}}>{item.passID}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.role}</td>
        </tr>
            )}
          
        </table>
    </div>
  )
}

export default UserTable
