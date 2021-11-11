import React,{useEffect, useState} from 'react';
import './App.css';
import Currency from './Currency';


const BASE_URL = "https://xch-api.herokuapp.com"

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState()
  const [amountInfromCurrenncy, setAmountInFromCurrency ] = useState(true)

// for exchanging the values.

  let toAmount, fromAmount
  if (amountInfromCurrenncy){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  // first use effect, which includes the 4 values from API in console.
  useEffect(()=>{
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        console.log("response", data)
      })
  }, [])


  // second use effect, which have all the rate for calculations
  useEffect(()=> {
    fetch("https://xch-api.herokuapp.com/rates")
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
     
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
   <h1> Calculator </h1>
   <div className="container">
    <Currency 
    currencyOptions={currencyOptions}
    selectedCurrency={fromCurrency}
    onChangeCurrency = {e => setFromCurrency(e.target.value) }
    onChangeAmount = {handleFromAmountChange}
    amount={fromAmount}
    />
    <div className="equals"> = </div>
   
    <Currency 
    currencyOptions={currencyOptions}
    selectedCurrency={toCurrency}
    onChangeCurrency = {e => setToCurrency(e.target.value) }
    onChangeAmount = {handleToAmountChange}
    amount={toAmount}
    />
      </div>
  </>

);
 }
 export default App;


