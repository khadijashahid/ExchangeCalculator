import React,{useEffect, useState} from 'react';

import './App.css';

import Currency from './Currency';

//const BASE_URL = "https://xch-api.herokuapp.com"

const BASE_URL = "https://xch-api.herokuapp.com/rates"

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState()
  const [amountInfromCurrenncy, setAmountInFromCurrency ] = useState(true)


  let toAmount, fromAmount
  if (amountInfromCurrenncy){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {

    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  

  useEffect(()=> {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      const secondCurrency = Object.keys(data.rates)[1]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setFromCurrency(secondCurrency)
      setExchangeRate(data.rates[firstCurrency])
      setExchangeRate(data.rates[secondCurrency])
    })
  }, [])

  function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

 return(
  <>
  <div className="wrapper">
    <div className="container">
   <header className="header"> Calculator </header>
  
    <Currency
    currencyOptions={currencyOptions}
    selectedCurrency={fromCurrency}
    onChangeCurrency = {e => setFromCurrency(e.target.value) }
    onChangeAmount = {handleFromAmountChange}
    amount={fromAmount}
    />
    </div>
    </div>
    
  </>
);
 }
 export default App;