import React from 'react'
import './fridge.css'
import {FridgeStatByAdress,AllFrideStat} from "../http"
import LocalizedStrings from 'react-localization';

let stringsText = new LocalizedStrings({
  en:{
    FridgeID:"Fridge ID",
    Adress:"Address",
    NoC:"Number of cells",
    NoU:"Number of users"
  },
  uk: {
    FridgeID:"ІД Холодильника",
    Adress:"Адресса",
    NoC:"Кількість комірок",
    NoU:"Кількість користувачів"
  }
 });


const FridgeTable = ({Adress, Modal,langueState}) => {
    const [state,setState] = React.useState([{
        FridgeID: null,
        Adress: "Loading...",
        NumberCells: null,
        NumberUsers: null
      }])
      stringsText.setLanguage(langueState)
      
      
      React.useEffect(()=>{
        const getFridge = async () =>{
          let getFridges;
          let adressquery = Adress.adress;
          if(adressquery === ""){
              getFridges = await AllFrideStat();
          }
          else{
              getFridges = await FridgeStatByAdress(adressquery);
          }
          let g = []
          for(let i = 0; i < getFridges.length;i++){
            g[i] = {
              FridgeID: null,
              Adress: "Loading...",
              NumberCells: null,
              NumberUsers: null
            }
            g[i].FridgeID = getFridges[i].fridgeId;
            g[i].Adress = getFridges[i].adress;
            g[i].NumberCells = getFridges[i].cellCount;
            g[i].NumberUsers = getFridges[i].userCount;
            
          }
          setState(g)
        }
        getFridge()
      },[Adress,Modal])
  return (
    <div>
      <table>
          <tr>
            <th style={{width: "10%"}}>{stringsText.FridgeID}</th>
            <th style={{width: "70%"}}>{stringsText.Adress}</th>
            <th style={{width: "10%"}}>{stringsText.NoC}</th>
            <th style={{width: "10%"}}>{stringsText.NoU}</th>
            
          </tr>

         {state.map(item =>
            <tr key={item.FridgeID}>
              <td style={{textAlign: "center"}}>{item.FridgeID}</td>
              <td>{item.Adress}</td>
              <td style={{textAlign: "center"}}>{item.NumberCells}</td>
              <td style={{textAlign: "center"}}>{item.NumberUsers}</td>
            </tr>
        )}
          
          

        </table>
    </div>
  )
}

export default FridgeTable
