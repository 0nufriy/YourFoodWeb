import React,{ useState } from 'react'
import "./order.css"
import Menu from '../component/Menu'
import { Navigate} from 'react-router-dom'
import Ordertable from './ordertable'

import LocalizedStrings from 'react-localization';

import {createNewOrdersForToday} from "../http"
let stringsText = new LocalizedStrings({
  en:{
    Createbutton:"Create orders for today",
    Filter:"Filter by date",
    From:"From",
    To:"to",
    Aplay: "Applay"
  },
  uk: {
    Createbutton:"Створити замовлення на сьогодні",
    Filter:"Фільтр за датою",
    From:"З",
    To:"по",
    Aplay: "Застосувати"
  }
 });

const Order = ({authenticated, isAuthorizetion,langueState}) => {



  stringsText.setLanguage(langueState)

  const DataNow = new Date();
  var year = DataNow.toLocaleString("default", { year: "numeric" });
  var month = DataNow.toLocaleString("default", { month: "2-digit" });
  var day = DataNow.toLocaleString("default", { day: "2-digit" });
  
  var formattedDate = year + "-" + month + "-" + day;
  var formattedDateFrom = year + "-" + (parseInt(month)-1).toString() + "-" + day;
  let from = React.createRef();
  let to = React.createRef();
  
  const [state, setState] = React.useState({
    
    From: formattedDateFrom,
    To: formattedDate
  })
    
  if(!authenticated){
    return <Navigate to= "/login"></Navigate>
  }

  function aplayfiltr(){
    
    setState({state,From: from.current.value, To: to.current.value})
  }
  function createneworder(){
    createNewOrdersForToday().then(response =>{
      setState({From: formattedDate, To: formattedDate})
      from.current.value = formattedDate;
      from.current.value = formattedDate;
    });
    
  }

 
  return (
    <div>
      
      <Menu isAuthorizetion={isAuthorizetion} indexActive={1} langueState = {langueState}></Menu>
      
      <div className='upOrder'>
        <button name='createorder'onClick={createneworder}>{stringsText.Createbutton}</button>
        <div>
          <p className='filtertext'>
          {stringsText.Filter}
          </p>
          <div className='filter'>
            <div className='fromto'>
            {stringsText.From}
            </div>
            <input  type="date" defaultValue={formattedDateFrom} min="2022-10-01" max={formattedDate} name = "data" ref={from}></input>
            <div className='fromto'>
            {stringsText.To}
            </div>
            <input id = "datePicker" type="date" defaultValue={formattedDate} min="2022-10-01" max={formattedDate} name = "data" ref={to}></input>
            <button name='aplayfiltr' onClick={aplayfiltr}>{stringsText.Aplay}</button>
          </div>
        </div>
      </div>
      <Ordertable From={state.From} To={state.To} langueState={langueState}></Ordertable>
    </div>
  )
}

export default Order
