import React from 'react'
import './SearchBox.scss'
import { BsSearch } from "react-icons/bs";

function SearchBox({onClick, onChange, width, value}) {

    return (
        <div className='search my-auto overflow-hidden shadow-sm d-none d-lg-flex' style={{
            width: width || '200px'
        }}>
            <input type="text" className='px-3' placeholder='Search' onChange={(e)=>{onChange(e.target.value)}}/>
            <span className="px-3 pb-1" to=""><BsSearch size={20} onClick={onClick}/></span>
        </div>
    )
}

export default SearchBox;