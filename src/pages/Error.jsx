import React from 'react'
import '../index.css';

const Error = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-85'>
        <div className='text-center'>
            <h2> 404 </h2>
            <h1>❌</h1>
            <p className='text-muted'>Page is not found</p>
        </div>
    </div>
  )
}

export default Error