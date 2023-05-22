import React from 'react'

//importing context
import { useStateContext } from '../context/StateContext'

const Form = () => {


    const {setName, setPh, setAddress} = useStateContext()

  return (
        <form>
            <div>
            <label for="name">Full Name: </label>
            <input type="text" name="name" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
            </div>

            <div>
            <label for="ph">Phone Number: </label>
            <input type="number" name="ph" placeholder="Phone number" onChange={(e) => setPh(e.target.value)}/>
            </div>

            <div>
            <label for="address">Address: </label>
            <input type="text" name="address" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
            </div>
        </form>
  )
}

export default Form