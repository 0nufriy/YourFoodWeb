import React from 'react'
import './fridge.css'
import {AddNewFridge} from "../http"
import LocalizedStrings from 'react-localization';

let stringsText = new LocalizedStrings({
  en:{
    Adress:"Address:",
    NoC:"Number of cells:",
    Add:"Add",
    Cancel:"Cancel",
    Error1: "Incorect number of cells",
    Error2: "Something went wrong"
  },
  uk: {
    Adress:"Адресса:",
    NoC:"Кількість комірок:",
    Add:"Додати",
    Cancel:"Відміна",
    Error1: "Невірна кількість комірок",
    Error2: "Щось  пішло не так:"
  }
 });
const NewFridge = ({setModal,langueState}) => {
  stringsText.setLanguage(langueState)
    const [state, setState] = React.useState({
        errormessage: " ",
        inputCellClass: "FridgeIntupt"
    })
    let adressInput = React.createRef();
    let cellCountInput = React.createRef();
    function AddFridge(){
        let adressT = adressInput.current.value;
        let cellCountT = parseInt(cellCountInput.current.value);
        if(cellCountT<=0 || cellCountT.toString()!=cellCountInput.current.value){
            setState({errormessage: stringsText.Error1, inputCellClass: "FridgeIntuptError"})
            return
        }
        AddNewFridge({
            "cellCount": cellCountT,
            "adress": adressT
          }).then(response => {
            if(response == 200){
                setModal(false)
            }else{
                setState({errormessage: stringsText.Error2, inputCellClass: "FridgeIntupt"})
            }
          })
    }
  return (
    <div className='AddFridgeModal'>
      <div className='AddFridgeModalBorder'>
        <div className = "TextUpField">
          {stringsText.Adress}
        </div>
        <div className = "TextField">
          <input name = "FridgeIntupt" ref={adressInput}></input>
        </div>
        <div className = "TextUpField">
        {stringsText.NoC}
        </div>
        <div className = "TextField">
          <input name = {state.inputCellClass} ref={cellCountInput}></input>
        </div>
        <div className = "errormesagefridge" style={{color: state.color}}>
              {state.errormessage}
            </div>
            <div className='buttondiv'>
              <button  type='submit' name = "Add" onClick={AddFridge}>{stringsText.Add}</button>
              <button  type='cancel' name = "CancelReg" onClick={()=>{setModal(false)}}>{stringsText.Cancel}</button>
            </div>
        </div>
      </div>
  )
}

export default NewFridge
