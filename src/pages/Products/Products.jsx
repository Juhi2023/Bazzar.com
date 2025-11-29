import React, { useEffect, useState } from 'react'
import './Products.scss'
import Product from '../../components/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Pagination } from '@mui/material';
import FilterBox from '../../components/FilterBox/FilterBox';
import {ImCross} from 'react-icons/im'
import MetaData from '../../components/MetaData';
import { getProductList } from '../../store/actions/ProductActions/ProductActions';

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(searchParams.get("page") ? parseInt(searchParams.get("page")) : 1)
  const {loading, error, products, filteredProductsCount}= useSelector(state => state.productListReducer)

  const handleChangePage = (e, value)=>{
    setPage(value)
    searchParams.delete("page")
    navigate({
      pathname: '/products',
      search: `?${createSearchParams([...searchParams.entries(), ["page", value]])}`,
    })
  }

  useEffect(()=>{
    let keyword = searchParams.get("keyword") || ""
    let currentPage = searchParams.get("page")
    let minPrice = searchParams.get("min")
    let maxPrice = searchParams.get("max")
    let rating = searchParams.get("rating")
    let sortBy = searchParams.get("sortBy")
    let category = searchParams.get("category") ? [...([...searchParams.entries()].filter(item=>item[0]==="category").map(item=>item[1]))] : []

    dispatch(getProductList({resultPerPage: 10, keyword, page: parseInt(currentPage), minPrice, maxPrice, rating, sortBy, category}))
  },[searchParams])

  return (
    <div className='products-page-container mt-4 container-xxl'>
      <MetaData title={`Products | BAZZAR.com`} />

      {
        <div className="filter-products-container d-flex align-items-stretch w-100">
          <div>
            <FilterBox/>
          </div>
          
            <div className='products-box-container'>
            {
              loading ?
              <Loader/>
              :
              products?.length ?
                <>
                  <div className="products-box">{console.log(products)}
                    {
                      products && products.slice(0, 10).map((elem, index)=>{
                        return(
                          <Product product={elem} key={index}/>
                        )
                      })
                    }
                    
                  </div>
                  <div className="pagination-box my-3">
                    <Pagination color="primary" size='small'
                      sx={{display: "flex", justifyContent: "center"}}
                      count={Math.ceil(filteredProductsCount/10)}
                      component="div"
                      page={page}
                      onChange={handleChangePage}
                    />
                  </div>
                </>
                :
                !error && <div className='mx-auto my-5 fw-bold'> <ImCross/> &nbsp; No product found</div>
            }
            </div>
        </div>
      }
    </div>
  )
}

export default Products