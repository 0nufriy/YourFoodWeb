import React from 'react'
import Menu from '../component/Menu'
import FridgeTable from './FridgeTable'
import NewFridge from './NewFridge'
import './fridge.css'
import LocalizedStrings from 'react-localization';

let stringsText = new LocalizedStrings({
  en:{
    AddButton:"Add new fridge",
    Filter:"Filter",
    Adress:"Address",
    Aplay:"Applay"
  },
  uk: {
    AddButton:"Додати холодильник",
    Filter:"Фільтр",
    Adress:"Адресса",
    Aplay:"Прийняти"
  }
 });

const Fridge = ({authenticated, isAuthorizetion,langueState}) => {
  if(!authenticated){
    return <Navigate to= "/login"></Navigate>
  }

  stringsText.setLanguage(langueState)

  let adressinput = React.createRef();
  const [state,setState] = React.useState({
    adress: "",
  })
  const [modal, setModal] = React.useState(false)
  
 
  return (
    <div>
      <Menu authenticated={authenticated} isAuthorizetion={isAuthorizetion} indexActive={3} langueState = {langueState}></Menu>
      <div className='FridgeUp'>
        <button name='newFridge' onClick={()=>{setModal(true)}}>{stringsText.AddButton}</button>
        <div style={{width: "50%"}}>
          <p className='AdressFilter'>
            {stringsText.Filter}
          </p>
          
          <div className='FilterAdressBlock'>
            <div className="Adress">
              {stringsText.Adress}
            </div>
            <input name="adress" ref ={adressinput}></input>
            
            <button name='aplayadressfiltr' onClick={() => {
              setState({adress: adressinput.current.value})
            }}>{stringsText.Aplay}</button>
          </div>
      </div>
      </div>
      {modal ? <NewFridge setModal={setModal} langueState={langueState}></NewFridge> : ""}
      
      <FridgeTable Adress={state} Modal={modal} langueState={langueState}></FridgeTable>
    </div>
  )
}

export default Fridge
