import React from "react"
import ExpenseItem from "./ExpenseItem"

const ExpenseList =({
    expenses,
    handleDelete,
    handleEdit,
    clearList
}) => {
    return(
        <div>
            <ul className="list">
                { expenses.map(expense =>{
                    return(
                        <ExpenseItem
                          key = { expense.id }
                          expense = { expense }
                          handleDelete={ handleDelete }
                          handleEdit={ handleEdit }
                        />
                    )
                })}
            </ul>

            {expenses.length > 0 && (
                <button className="btn" onClick = {clearList}>
                   Clear Expenses
                    < i className="fa fa-trash btn-icon"></i>
                </button>
            )}
        </div>
    )
}

export default ExpenseList
