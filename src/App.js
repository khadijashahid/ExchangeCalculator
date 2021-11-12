import React,{useEffect, useState} from 'react';
import './App.css';
import Currency from './Currency';


const BASE_URL = "https://xch-api.herokuapp.com/rates"

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amounts, setAmount] = useState()
  const [amountInfromCurrenncy, setAmountInFromCurrency ] = useState(true)

// for exchanging the values.

  let toAmount, fromAmount
  if (amountInfromCurrenncy){
    fromAmount = amounts
    toAmount = amounts * exchangeRate
  } else {
    toAmount = amounts
    fromAmount = amounts / exchangeRate
  }




  // second use effect, which have all the rate for calculations
  useEffect(()=> {
    fetch(BASE_URL)
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
    selectedCurrencys={fromCurrency}
    onChangeCurrency = {e => setFromCurrency(e.target.value) }
    onChangeAmount = {handleFromAmountChange}
    amounts={fromAmount}
    />
    <div className="equals"> = </div>
   
    <Currency 
    currencyOptions={currencyOptions}
    selectedCurrencys={toCurrency}
    onChangeCurrency = {e => setToCurrency(e.target.value) }
    onChangeAmount = {handleToAmountChange}
    amounts={toAmount}
    />
      </div>
  </>

);
 }
 export default App;


