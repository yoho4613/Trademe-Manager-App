import React from 'react'
import { useStateContext } from '../context/StateContext'


const SellingProducts = () => {
  const {user, fetchData} = useStateContext();

  

  return (
    <div>
      Selling product
    </div>
  )
}


export default SellingProducts