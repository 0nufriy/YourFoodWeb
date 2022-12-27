import React from 'react'
import "./order.css"
import {orderslist, setOrderState} from "../http"
import LocalizedStrings from 'react-localization';

let stringsText = new LocalizedStrings({
  en:{
    Ordersid:"Order ID",
    Login:"Login",
    PassID:"Pass ID",
    Passname:"Pass name",
    Adress: "Address",
    Status: "Status",
    OrderDate: "Date",
    CellId: "Cell ID",
    Done: "Done",
    InRoad: "In road",
    InCell: "In cell",
    Declin: "Declined"
  },
  uk: {
    Ordersid:"ID Замовлення",
    Login:"Логін",
    PassID:"ID Підписки",
    Passname:"Підписка",
    Adress: "Адресса",
    Status: "Статус",
    OrderDate: "Дата",
    CellId: "Номер Комірки",
    Done: "Готово",
    InRoad: "В дорозі",
    InCell: "На місці",
    Declin: "Відхилено"
  }
 });
const Ordertable = ({From,To,langueState}) => {
  stringsText.setLanguage(langueState)
  

  const [state,setState] = React.useState([{
    order_id: null,
    login: "Loading...",
    pass_id: null,
    pass_name: "",
    adress: "",
    status: "",
    date: "",
    cellId: null
  }])

  const getOrder = async () =>{
    const getOrders = await orderslist({
      "From": From,
      "To": To
    });
    let g = []
    for(let i = 0; i < getOrders.length;i++){
      g[i] = {
        order_id: null,
        login: "",
        pass_id: null,
        pass_name: "",
        adress: "",
        status: "",
        date: "",
        cellId: null
      }
      g[i].order_id = getOrders[i].orderID;
      g[i].login = getOrders[i].login;
      g[i].pass_id = getOrders[i].passID;
      g[i].pass_name = getOrders[i].passName;
      g[i].adress = getOrders[i].adress;
      g[i].status = getOrders[i].status;
      g[i].date = getOrders[i].date.slice(0, 10);
      g[i].cellId = getOrders[i].cellId;
      
    }
    setState(g)    
  }


  React.useEffect(()=>{
    const getOrder = async () =>{
      const getOrders = await orderslist({
        "From": From,
        "To": To
      });
      let g = []
      for(let i = 0; i < getOrders.length;i++){
        g[i] = {
          order_id: null,
          login: "",
          pass_id: null,
          pass_name: "",
          adress: "",
          status: "",
          date: "",
          cellId: null
        }
        g[i].order_id = getOrders[i].orderID;
        g[i].login = getOrders[i].login;
        g[i].pass_id = getOrders[i].passID;
        g[i].pass_name = getOrders[i].passName;
        g[i].adress = getOrders[i].adress;
        g[i].status = getOrders[i].status;
        g[i].date = getOrders[i].date.slice(0, 10);
        g[i].cellId = getOrders[i].cellId;
        
      }
      setState(g)    
    }
    getOrder()
  },[From,To])
  
  function changeStatus(e){
      let idorder = parseInt(e.nativeEvent.target.name);
      let selectedint = e.nativeEvent.target.selectedIndex;
      let newStatus= "In road";
      if(selectedint === 0){
        newStatus = "Done"
      }else if(selectedint === 2){
        newStatus = "In cell"
      }else if(selectedint === 3){
        newStatus = "Declined"
      }
      setOrderState(
        {
          "orderid": idorder,
          "status": newStatus
        }
      ).then(response =>{
        if(response === 200){
          for(let i = 0; i<state.length; i++){
            if(state[i].order_id === idorder){
              state[i].status = newStatus;
              getOrder();
              break;
            }
          }
        }
    }).catch(err => {})
  }

  return (
    <div >
        <table>
          <tr>
            <th style={{width: "8%"}}>{stringsText.Ordersid}</th>
            <th style={{width: "15%"}}>{stringsText.Login}</th>
            <th style={{width: "8%"}}>{stringsText.PassID}</th>
            <th style={{width: "10%"}}>{stringsText.Passname}</th>
            <th style={{width: "42%"}}>{stringsText.Adress}</th>
            <th style={{width: "8%"}}>{stringsText.CellId}</th>
            <th style={{width: "5%"}}>{stringsText.Status}</th>
            <th style={{width: "12%"}}>{stringsText.OrderDate}</th>
          </tr>

          {state.map((item,index) => 
          <tr>
            <td style={{textAlign: "center"}}>{item.order_id}</td>
            <td>{item.login}</td>
            <td style={{textAlign: "center"}}>{item.pass_id}</td>
            <td>{item.pass_name}</td>
            <td>{item.adress}</td>
            <td style={{textAlign: "center"}}>{item.cellId}</td>
            <td style={{textAlign: "center"}}>
              <select name={item.order_id} className='status' style={{
                backgroundColor: item.status.trim() === "In road" ? "#FFC28A" : 
                                  item.status.trim() === "Done" ? "#70FFA9" :
                                  item.status.trim() === "In cell" ? "#FFF281" :"#FF8181"
              }} onChange={e => {
                  changeStatus(e)
              }}>
                  <option selected={item.status.trim() === "Done" ? true : false}>{stringsText.Done}</option>
                  <option selected={item.status.trim() === "In road" ? true : false}>{stringsText.InRoad}</option>
                  <option selected={item.status.trim() === "In cell" ? true : false}>{stringsText.InCell}</option>
                  <option selected={item.status.trim() === "Declined" ? true : false}>{stringsText.Declin}</option>
                </select>
              
            </td>
            <td style={{textAlign: "center"}}>{item.date}</td>
          </tr>
          )}

        </table>
    </div>
  )
}

export default Ordertable
