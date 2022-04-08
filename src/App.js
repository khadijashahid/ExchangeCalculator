import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faExchangeAlt} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Currency from './Currency';
<script src="https://kit.fontawesome.com/51ff4e98b4.js" crossorigin="anonymous"></script>

// const BASE_URL = "https://xch-api.herokuapp.com"

const BASE_URL = "https://xch-api.herokuapp.com/rates"

function App() {
  const [currencyName, setCurrencyName] = useState('')
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInfromCurrency, setAmountInFromCurrency ] = useState(true)
  console.log(exchangeRate)


  let toAmount, fromAmount
  if (amountInfromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {

    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  useEffect(() => {
    fetch("https://xch-api.herokuapp.com")
        .then(response => response.json())
        .then(data => {
            setCurrencyName(data.currencies)
        })
}, [])
  

  useEffect(()=> {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const firstCurrency = Object.keys(data.rates)[1]
      const secondCurrency = Object.keys(data.rates)[0]
      setCurrencyOptions([data.success,...Object.keys(data.rates)])
      setFromCurrency(firstCurrency)
      setToCurrency(secondCurrency)
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
  <div className="wrapper">
    <div className="container">
   <header className="header"> Calculator </header>
   { console.log("currencyName", currencyName) }
  
    <Currency
    currencyOptions={currencyOptions}
    selectedCurrency={fromCurrency}
    onChangeCurrency = {e => setFromCurrency(e.target.value) }
    onChangeAmount = {handleFromAmountChange}
    amount={fromAmount}
    />
    <div className="icon"> <FontAwesomeIcon icon={faExchangeAlt}> </FontAwesomeIcon> </div>

     <Currency
    currencyOptions={currencyOptions}
    selectedCurrency={toCurrency}
    onChangeCurrency = {e => setToCurrency(e.target.value) }
    onChangeAmount = {handleToAmountChange}
    amount={toAmount}
    />
    
    </div>
    </div>
    
  </>
);
 }
 export default App;