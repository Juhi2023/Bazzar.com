import React, { useState } from 'react'
import openEye from '../../../../assets/images/open-eye.svg'
import closeEye from '../../../../assets/images/close-eye.svg'
import './InputBox.scss'
import { ErrorMessage, useField } from 'formik'

function InputBox({type, name, placeholder}) {
    const [showPassword, setShowPassword] = useState(false)
    const [field, meta] = useField({type, name})

  return (
    <div className='input-container'>
        {
            name==='password'
            ?
                <div className='input-box'>
                    <input type={showPassword ? 'text': 'password'} name={name} placeholder={placeholder} {...field}/>
                    <span onClick={()=>{setShowPassword(prev=>!prev)}}>
                        {showPassword? <img src={closeEye} alt="" /> : <img src={openEye} alt="" />}
                    </span>
                </div>
            :
                name==='phoneNo'
                ?
                    <div className='input-box'>
                        <div className='country-code'>+91</div>
                        <input maxLength={'10'} type={type} name={name} placeholder={placeholder} {...field}/>
                    </div>
                :
                    <div className='input-box'>
                        <input type={type} name={name} placeholder={placeholder} {...field}/>
                    </div>
        }

        <div className="error">{(meta.touched && meta.error) ? <ErrorMessage name={field.name} /> : <>&nbsp;</>}</div>
    </div>
  )
}

export default InputBox