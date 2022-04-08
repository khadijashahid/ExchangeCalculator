import React from "react";



export default function Currency(props) {
   
    const {

        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props

 

    return (
        <div className="row">
            <div className="col-md-6">
         
                 <input type="number" className="inp1" value={amount} onChange={onChangeAmount} />
            <select className="sel1" value={selectedCurrency} onChange={onChangeCurrency} >
                {
               currencyOptions.map(currencies => (
                            <option key={currencies} value={currencies}>
                               
                               {currencies}
                            </option>
                )
            )}

            </select>
            <br/>
            </div>
            </div>
           


           
           
    )
}