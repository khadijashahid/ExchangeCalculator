import React, { useState, useEffect } from "react";

const BASE_URL = "https://xch-api.herokuapp.com"
export default function Currency(props) {
    const [currencyName, setCurrencyName] = useState("");
    const [loading, setLoading] = useState(false);
    const {
        selectedCurrency,
        onChangeCurrency,
        amount
    } = props

    useEffect(() => {
        setLoading(true);
        fetch(BASE_URL)
            .then(res => res.json())
            .then(data => {
                setCurrencyName(data.currencies)
            })
            .catch((err) => {
                console.log(err);
            });

         
          }, []);

          if (loading) {
            return <p>Data is loading...</p>;
          }

    return (
        <div className="row">
            <div className="col-md-6">
                {
                    console.log("currencyName", currencyName.crypto)
                }
                {
                    console.log("currencyName", currencyName)
                }
                <input type="number" className="input" value={amount} />

                <select>
                    <option>--Select Country Currency--</option>
                    {
                        currencyName.crypto.map((currencyName, index) => {
                            return (
                                <option key={index}>
                                    {currencyName.name}
                                </option>
                            )
                        })
                    }
                </select>
                <br />
                <input type="number" className="input" value={amount} />
                <select value={selectedCurrency} onChange={onChangeCurrency} >
                    <option>--Select Country Currency--</option>
                    {
                        currencyName.fiat.map((currencyName, index) => {
                            return (
                                <option key={index}>
                                    {currencyName.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="col-md-6">
                <div>
                    <p>Country Currency Logo</p>
                    {
                        currencyName.crypto.map((currencyName, index) => {
                            return (
                                <span className="p-3" key={index}>
                                    <img  src={currencyName.icon}  alt="img1"/>
                                </span>
                            )
                        })
                    }
                </div>
                <div>
                    <p>Crypto Currency Logo</p>
                    {
                        currencyName.crypto.map((currencyName, index) => {
                            return (
                                <span className="p-3" key={index}>
                                    <img  src={currencyName.icon} alt="img1"/>
                                </span>
                            )
                        })
                    }
                </div>
            </div>

        </div >

  


    )
}