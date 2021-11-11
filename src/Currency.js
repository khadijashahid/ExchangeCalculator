import React from "react";



 export default function Currency(props)
 {
     const{
         currencyOptions,
         selectedCurrency,
         onChangeCurrency,
         onChangeAmount,
         amount
     } = props
 
     return(
    
          <div className="container2">
            
        <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
        
        <select value={selectedCurrency} onChange={onChangeCurrency} >
      
            {currencyOptions.map(option => (
                
                  <option key={option} value={option}>{option}
                  
              </option>

            ))}
        
        </select>
        </div>
       
    
     
     )
 }