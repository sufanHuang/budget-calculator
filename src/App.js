import React, { useState, useEffect } from 'react';
import './App.css';
import header from "./images/header.png"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import Alert from "./components/Alert"
import uuid from 'uuid/v4'

const getSavedExpenses = () => {
    let expenses = localStorage.getItem('expenses')

    if(expenses) {
        return JSON.parse(expenses)
    }

    return []
}


function App() {
    const [ expenses, setExpenses ] = useState(getSavedExpenses())
    const [ charge, setCharge ] = useState("")
    const [ amount, setAmount ] = useState("")
    const [ alert, setAlert ] = useState({ show: false })
    const [ edit, setEdit ] = useState(false)
    const [ id, setId ] = useState(0)

    useEffect( ()=>{
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }, [expenses])

    const handleCharge = (event)=>{
        setCharge(event.target.value)
    }

    const handleAmount = (event) =>{
        let amount = event.target.value
        if(amount === ""){
            setAmount(amount)
        }
        setAmount(parseInt(amount))
    }

    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text })
        setTimeout( ()=>{
            setAlert({ show: false })
        }, 7000)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if( charge !== "" && amount > 0){


            if(edit){
                let editExpenses = expenses.map(item =>{
                    return item.id === id ? { ...item, charge, amount } : item
                })
                setExpenses(editExpenses)
                setEdit(false)
            }else{
                const currentExpense = { id: uuid(), charge, amount }
                setExpenses([ ...expenses, currentExpense])
                handleAlert({
                    type: "success",
                    text: "Item added"
                })
            }
            setCharge("")
            setAmount("")

        }else{
            handleAlert({
                type: "danger",
                text: "Please add an item with valid amount"
            })
        }
    }

    const handleDelete = (id) => {
        let filteredExpenses = expenses.filter(item => item.id !== id)
        setExpenses(filteredExpenses)
        handleAlert({
            type: "danger",
            text: "Item deleted"
        })
    }

    const clearList = ()=>{
        setExpenses([])
    }

    const handleEdit = (id) =>{
        let currentExpense = expenses.find(item=> item.id === id)
        let { charge, amount } = currentExpense
        setCharge(charge)
        setAmount(amount)
        setEdit(true)
        setId(id)
    }

    return(
        <div>
        <main className = 'App'>
            {alert.show && <Alert type={alert.type} text={alert.text}/>}
            <h1>Budget Calculator</h1>
            <img src={header} alt ="" className= "header"/>
            <ExpenseForm
                handleCharge = { handleCharge }
                handleAmount = { handleAmount }
                handleSubmit = { handleSubmit }
                charge = { charge }
                amount = { amount }
                edit = { edit }
            />
            <ExpenseList
                expenses = { expenses }
                handleDelete = { handleDelete }
                handleEdit = { handleEdit }
                clearList = { clearList }
            />

            <h1>
                Total Spending:
                <span>
                $ { expenses.reduce( (acc, curr) =>{
                    return (acc += curr.amount)
                }, 0)}
            </span>
            </h1>
        </main>
      </div>
    )
}

export default App;
