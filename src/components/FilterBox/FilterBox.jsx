import React, { useEffect, useState } from 'react'
import './FilterBox.scss'
import { Accordion, AccordionDetails, AccordionSummary, Drawer, Slider } from '@mui/material';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import {FaSortAmountUp, FaFilter} from 'react-icons/fa'
import {IoIosArrowDown} from 'react-icons/io'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {getCategoryList} from '../../store/actions/CategoryAction/CategoryActions'
import cross from '../../assets/images/cross.svg'

function FilterBox() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState(searchParams.get("keyword") || "")
    const [price, setPrice] = useState([(searchParams.get("min") ? parseInt(searchParams.get("min")) : 200), ( searchParams.get("max") ? parseInt(searchParams.get("max")) :10000)]);
    const [rating, setRating] = useState((searchParams.get("rating") ? parseInt(searchParams.get("rating")) : 0));
    const [category, setCategory] = useState((searchParams.get("category") ? [...([...searchParams.entries()].filter(item=>item[0]==="category").map(item=>item[1]))] : []));
    const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "")
    const {categories} = useSelector(state => state.categoryListReducer)

    //for mobile view
    const [state, setState] = useState({
        sort: false,
        filter: false
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

    const handleApplyFilter = ()=>{
        searchParams.delete("keyword")
        searchParams.delete("category")

        navigate({
            pathname: '/products',
            search: `?${createSearchParams([
                ...searchParams.entries(), 
                ...(searchText ? [["keyword", searchText]]: []),
                ...(price[0]!==200 ? [["min", price[0]]]: []),
                ...(price[1]!==10000 ? [["min", price[1]]] : []),
                ...(rating ? [["rating", rating]] : []),
                ...(category.length ? [...category.map((item)=> ['category', item])] : []),
                ...(sortBy ? [["sortBy", sortBy]] : [])
            ])}`,
        }) 
    }

    //search
    const handleSearch = ()=>{
        searchParams.delete("keyword")
        searchParams.delete("page")
        navigate({
            pathname: '/products',
            search: `?${createSearchParams([["keyword", searchText]])}`,
        })
    }
    
    //price
    const handlePriceChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPrice([Math.min(newValue[0], price[1] - 200), price[1]]);
        } else {
            setPrice([price[0], Math.max(newValue[1], price[0] + 200)]);
        }
    };

    const handlePriceChangeCommitted = (event, newValue, activeThumb)=>{
        searchParams.delete("min")
        searchParams.delete("max")
        searchParams.delete("page")

        if(window.innerWidth>1500){
            navigate({
                pathname: '/products',
                search: `?${createSearchParams([...searchParams.entries(), ["min", newValue[0]], ["max", newValue[1]]])}`,
            })
        }
    }

    const clearPriceValue = ()=>{
        setPrice([200, 10000])

        searchParams.delete("min")
        searchParams.delete("max")
        searchParams.delete("page")

        if(window.innerWidth>1500)
            navigate({
                pathname: '/products',
                search: `?${createSearchParams([...searchParams.entries()])}`,
            })
    }

    //rating
    const handleRatingChange = (event, newValue, activeThumb) => {
        setRating(newValue)
    };

    const handleRatingChangeCommitted = (event, newValue, activeThumb)=>{
        searchParams.delete("rating")
        searchParams.delete("page")

        if(window.innerWidth > 1500){
            navigate({
                pathname: '/products',
                search: `?${createSearchParams([...searchParams.entries(), ["rating", newValue]])}`,
            })
        }
    }

    const clearRatingValue = ()=>{
        setRating(0)
        searchParams.delete("rating")
        searchParams.delete("page")

        if(window.innerWidth>1500)
            navigate({
                pathname: '/products',
                search: `?${createSearchParams([...searchParams.entries()])}`,
            })
    }

    //category
    const handleCategoryChange = (e)=>{
        searchParams.delete("page")
        if(category.includes(e.target.value)){
            setCategory((prev)=> {
                prev.splice(prev.indexOf(e.target.value), 1)
                return prev
            })
            if(window.innerWidth>1500)
                navigate({
                    pathname: '/products',
                    search: `?${createSearchParams([...[...searchParams.entries()].filter(item => item[1]!==e.target.value)])}`,
                })
        }else{
            setCategory([...category, e.target.value])
            if(window.innerWidth>1500)
                navigate({
                    pathname: '/products',
                    search: `?${createSearchParams([...searchParams.entries(), ["category", e.target.value]])}`,
                })
        }
    }

    const clearCategorytValue = ()=>{
        searchParams.delete("category")
        searchParams.delete("page")
        setCategory([])

        if(window.innerWidth>1500)
            navigate({
                pathname: '/products',
                search: `?${createSearchParams([...searchParams.entries()])}`,
            })
    }


    //sorting
    const handleSortChange = (event)=>{
        setSortBy(event.target.value)

        searchParams.delete("sortBy")
        searchParams.delete("page")
        if(window.innerWidth>1500)
            navigate({
                pathname: '/products',
                search: `?${createSearchParams([...searchParams.entries(), ["sortBy", event.target.value]])}`,
            })
    }

    const clearSortValue = ()=>{
        setSortBy("")
        searchParams.delete("sortBy")
        searchParams.delete("page")

        if(window.innerWidth>1500)
            navigate({
                pathname: '/products',
                search: `?${createSearchParams([...searchParams.entries()])}`,
            })
    }

    useEffect(()=>{
        dispatch(getCategoryList())
    },[])

  return (
    <>
        {
            <>
                <div className='filterBox-dekstop-view'>
                    <div  className='product-search-box'>
                        <input type="text" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} className='border'/>
                        <button type="button" onClick={handleSearch}>Go</button>
                    </div>
                    <div>
                        <Accordion sx={{backgroundColor: "transparent", boxShadow: "none", borderBottom: "0.5px solid rgb(233, 231, 231)",}}
                            defaultExpanded={true}
                        >
                            <AccordionSummary
                            expandIcon={<IoIosArrowDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <div className="heading"> Filters</div>
                            </AccordionSummary>
                            <AccordionDetails>
                            <div className="filters">
                                <div className="price-filter">
                                    <div className="title">
                                        price
                                        {!(price[0]===200 && price[1] === 10000) && <button type='button' className='price-clear-btn' onClick={clearPriceValue}>clear</button> }
                                    </div>
                                    <Slider
                                        min={200}
                                        max={10000}
                                        step={100}
                                        getAriaLabel={() => 'price'}
                                        value={price}
                                        onChange={handlePriceChange}
                                        onChangeCommitted={handlePriceChangeCommitted}
                                        valueLabelDisplay="auto"
                                        size='small'
                                        disableSwap
                                    />
                                    <div className="d-flex justify-content-between">
                                        <span>Rs. 200</span>
                                        <span>Rs. 10,000 +</span>
                                    </div>
                                </div>

                                <div className="category-filter">
                                    <div className="title">
                                        category
                                        {!!category?.length && <button type='button' className='category-clear-btn' onClick={clearCategorytValue}>clear</button> }
                                    </div>
                                    {
                                        categories 
                                        &&
                                        <div className='category-options'>
                                            {categories?.map((item, index)=>{
                                                return(
                                                    <div className='d-flex align-items-center' key={index}><input className='me-2' type='checkbox' value={item?.slug} onClick={handleCategoryChange} defaultChecked={category.includes(item?.slug)}/> {item.name}</div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>

                                <div className="rating-filter">
                                    <div className="title">
                                        customer ratings
                                        {!(rating == 0) && <button type='button' className='rating-clear-btn' onClick={clearRatingValue}>clear</button> }
                                    </div>
                                    <Slider
                                        min={0}
                                        max={5}
                                        step={1}
                                        getAriaLabel={() => 'rating'}
                                        value={rating}
                                        onChange={handleRatingChange}
                                        onChangeCommitted={handleRatingChangeCommitted}
                                        valueLabelDisplay="auto"
                                        size='small'
                                    />
                                    <div className="d-flex justify-content-between">
                                        <span>0 <AiFillStar/></span>
                                        <span>5 <AiFillStar/> </span>
                                    </div>
                                </div>

                            </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className='sorting'>
                    <Accordion sx={{backgroundColor: "transparent", boxShadow: "none", borderBottom: "0.5px solid rgb(233, 231, 231)",}}
                        defaultExpanded={true}
                    >
                            <AccordionSummary
                            expandIcon={<IoIosArrowDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                                <div className='heading'>Sort</div>
                            </AccordionSummary>
                            <AccordionDetails>
                                {sortBy && <button type='button' className='sort-clear-btn' onClick={clearSortValue}>clear</button> }
                                <div className="sort-options">
                                    <div className='option'><input type="radio" name="sortBy" checked={sortBy==='rating'} value="rating" onChange={handleSortChange}/> Ratings </div>
                                    <div className='option'><input type="radio" name="sortBy" checked={sortBy==='price:LH'} value="price:LH" onChange={handleSortChange}/> Price: Low to High </div>
                                    <div className='option'><input type="radio" name="sortBy" checked={sortBy==='price:HL'} value="price:HL" onChange={handleSortChange}/> Price: High to Low </div>
                                    <div className='option'><input type="radio" name="sortBy" checked={sortBy==='latest'} value="latest" onChange={handleSortChange}/> Newest First </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>

                <div className="filterBox-mobile-view">
                    <Row className="filter-btns">
                        <Col onClick={toggleDrawer("filter", true)}><FaFilter/> &nbsp; Filters</Col>
                        <Col onClick={toggleDrawer("sort", true)} className='border-start'><FaSortAmountUp/> &nbsp; Sort</Col>
                    </Row>
                    <Drawer
                        anchor={"bottom"}
                        open={state["filter"]}
                        onClose={toggleDrawer("filter", false)}
                    >
                        <div className="filter-drawer">
                            <div className='heading'>
                                <span><FaFilter/> &nbsp; Filters</span>
                                <img src={cross} onClick={()=>setState({ ...state, 'filter': false })} alt="" />
                            </div>

                            <div className="filters">
                            <div  className='product-search-box'>
                                <input type="text" value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} className='border'/>
                                <button type="button" onClick={handleSearch}>Go</button>
                            </div>
                                <div className="price-filter">
                                    <div className="title">
                                        price
                                        {!(price[0]===200 && price[1] === 10000) && <button type='button' className='price-clear-btn' onClick={clearPriceValue}>clear</button> }
                                    </div>
                                    <Slider
                                        min={200}
                                        max={10000}
                                        step={100}
                                        getAriaLabel={() => 'price'}
                                        value={price}
                                        onChange={handlePriceChange}
                                        onChangeCommitted={handlePriceChangeCommitted}
                                        valueLabelDisplay="auto"
                                        size='small'
                                        disableSwap
                                    />
                                    <div className="d-flex justify-content-between">
                                        <span>Rs. 200</span>
                                        <span>Rs. 12,000 +</span>
                                    </div>
                                </div> 

                                <div className="category-filter">
                                    <div className="title">
                                        category
                                        {!!category?.length && <button type='button' className='category-clear-btn' onClick={clearCategorytValue}>clear</button> }
                                    </div>
                                    {
                                        categories 
                                        &&
                                        <div className='category-options'>
                                            {categories?.map((item, index)=>{
                                                return(
                                                    <div className='d-flex align-items-center' key={index}><input className='me-2' type='checkbox' value={item?.slug} onClick={handleCategoryChange} defaultChecked={category.includes(item?.slug)}/> {item.name}</div>
                                                )
                                            })}
                                        </div>
                                    }
                                </div>

                                <div className="rating-filter">
                                    <div className="title">
                                        customer ratings
                                        {!(rating == 0) && <button type='button' className='rating-clear-btn' onClick={clearRatingValue}>clear</button> }
                                    </div>
                                    <Slider
                                        min={0}
                                        max={5}
                                        step={1}
                                        getAriaLabel={() => 'rating'}
                                        value={rating}
                                        onChange={handleRatingChange}
                                        onChangeCommitted={handleRatingChangeCommitted}
                                        valueLabelDisplay="auto"
                                        size='small'
                                    />
                                    <div className="d-flex justify-content-between">
                                        <span>0 <AiFillStar/></span>
                                        <span>5 <AiFillStar/> </span>
                                    </div>
                                </div>

                            </div>
                            <button type='button' className='apply-filter-btn' onClick={handleApplyFilter}>Apply</button>
                        </div>

                    </Drawer>

                    <Drawer
                        anchor={"bottom"}
                        open={state["sort"]}
                        onClose={toggleDrawer("sort", false)}
                    >
                        <div className="sorting-drawer">
                            <div className='sorting'>
                                <div className='heading'>
                                    <span><FaSortAmountUp/> &nbsp; Sort</span>
                                    <img src={cross} onClick={()=>setState({ ...state, 'filter': false })} alt="" />
                                </div>
                                {sortBy && <button type='button' className='sort-clear-btn' onClick={clearSortValue}>clear</button> }
                                <div className="sort-options">
                                    <div className='option'><input type="radio" name="sortBy" checked={sortBy==='rating'} value="rating" onChange={handleSortChange}/> Ratings </div>
                                    <div className='option'><input type="radio" name="sortBy" checked={sortBy==='price:LH'} value="price:LH" onChange={handleSortChange}/> Price: Low to High </div>
                                    <div className='option'><input type="radio" name="sortBy" checked={sortBy==='price:HL'} value="price:HL" onChange={handleSortChange}/> Price: High to Low </div>
                                    <div className='option'><input type="radio" name="sortBy" checked={sortBy==='latest'} value="latest" onChange={handleSortChange}/> Newest First </div>
                                </div>
                            </div>
                            <button type='button' className='apply-filter-btn' onClick={handleApplyFilter}>Apply</button>
                        </div>
                    </Drawer>

                </div>
            </>
        }
    </>
  )
}

export default FilterBox