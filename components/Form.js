import React from 'react'

const Form = () => {
  return (
        <form>
            <div>
            <label for="name">Full Name: </label>
            <input type="text" name="name" placeholder="Full Name" />
            </div>

            <div>
            <label for="ph">Phone Number: </label>
            <input type="number" name="ph" placeholder="Full Name" />
            </div>

            <div>
            <label for="address">Address: </label>
            <input type="text" name="address" placeholder="Full Name" />
            </div>
        </form>
  )
}

export default Form