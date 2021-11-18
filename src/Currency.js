import React, { useState, useEffect } from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faExchangeAlt} from '@fortawesome/free-solid-svg-icons';

<script src="https://kit.fontawesome.com/51ff4e98b4.js" crossorigin="anonymous"></script>
export default function Currency(props) {
    const [currencyName, setCurrencyName] = useState('')

    const {

        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        currencies,
        amount
    } = props

    useEffect(() => {
        fetch("https://xch-api.herokuapp.com")
            .then(response => response.json())
            .then(data => {
                setCurrencyName(data.currencies)
            })
    }, [])

    return (
        <div className="row">
            <div className="col-md-6">
            {
                    console.log("currencyName", currencyName.crypto)
                }
                {
                    console.log("currencyName", currencyName)
                }
         
                 <input type="number" className="inp1" value={amount}  />
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
            <div className="icon"> <FontAwesomeIcon icon={faExchangeAlt}> </FontAwesomeIcon> </div>
            <input type="number" className="inp1" value={amount}  />
            <select className="sel1" value={selectedCurrency} onChange={onChangeCurrency} >
                {
               currencyOptions.map(currencies => (
                            <option key={currencies} value={currencies}>
                                {currencies}
                            </option>
                )
            )}

            </select>
            </div>
            </div>
           


           
           
    )
}