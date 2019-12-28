import React from "react"

const ExpenseItem = ({
    expense: { id, charge, amount },
    handleDelete,
    handleEdit
}) => {
    return(
        <li className= "item">
            <div className="info">
                <span className="expense">{charge}</span>
                <span className="amount">${amount}</span>
            </div>
            <div>
                <button
                    className='edit-btn'
                    onClick={()=>handleEdit(id)}
                >
                    < i className="fa fa-edit"></i>
                </button>
                <button
                    className='clear-btn'
                    onClick={()=>handleDelete(id)}
                >
                    < i className="fa fa-trash"></i>
               </button>
            </div>
        </li>
    )
}

export default ExpenseItem
