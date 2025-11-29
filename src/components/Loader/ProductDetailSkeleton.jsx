import { Skeleton } from '@mui/material'
import React from 'react'

function ProductDetailSkeleton() {
  return (
    <>
        {
            window.innerWidth >=1200 
            ?
            <div className='d-flex px-2 px-xxl-5'>
                <Skeleton variant="rectangular" width={"50%"} height={"80vh"} sx={{mr:5}}/>
                <div className='w-50'>
                    <Skeleton variant="rectangular" width={100} height={20} sx={{mb:2}}/>
                    <Skeleton variant="rectangular" width={80} height={20} sx={{mb:2}}/>
                    <Skeleton variant="rectangular" width={70} height={20} sx={{mb:2}}/>
                    <Skeleton variant="rectangular" width={"100%"} height={"50vh"} sx={{mb:2}}/>
                    <Skeleton variant="rectangular" width={"100%"} height={"40"} sx={{mb:2}}/>
                </div>
            </div>
            :
            <div className='d-flex px-2 px-xxl-5 flex-column'>
                <Skeleton variant="rectangular" width={"100%"} height={500} sx={{mb:2}}/>
                <div className='w-100'>
                    <Skeleton variant="rectangular" width={100} height={20} sx={{mb:2}}/>
                    <Skeleton variant="rectangular" width={80} height={20} sx={{mb:2}}/>
                    <Skeleton variant="rectangular" width={70} height={20} sx={{mb:2}}/>
                    <Skeleton variant="rectangular" width={"100%"} height={200} sx={{mb:2}}/>
                    <Skeleton variant="rectangular" width={"100%"} height={40} sx={{mb:2}}/>
                </div>
            </div>
        }
    </>
  )
}

export default ProductDetailSkeleton