import React from 'react'
import { CircularProgress } from '@mui/material'

function Loader() {
  return (
    <div className='my-5 text-center'>
      <CircularProgress />
    </div>
  )
}

export default Loader