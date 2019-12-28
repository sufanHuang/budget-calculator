import React from 'react'

const ExpenseForm = ({
    charge,
    amount,
    edit,
    handleCharge,
    handleAmount,
    handleSubmit
}) => {
    return(
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="expense">Charge</label>
                    <input
                        type = "text"
                        className="form-control"
                        id="charge"
                        name="charge"
                        placeholder="e.g. Mortgage"
                        value = { charge }
                        onChange = { handleCharge }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type = "number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        placeholder="e.g. 1000"
                        value = { amount }
                        onChange = { handleAmount }
                    />
                </div>
            </div>

            <button type = "submit" className="btn">
                {edit ? "edit" : "submit"}
                <i className="fa fa-gavel btn-icon"></i>
            </button>

        </form>
    )
}

export default ExpenseForm

