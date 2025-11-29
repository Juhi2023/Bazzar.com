import React, { useEffect, useRef, useState } from 'react'
import './Profile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount, getUserAddress, getUserProfileData, updatePassword, updateUserAddress, updateUserDetails } from '../../store/actions/AuthActions/AuthActions'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addressUpdateValidation, passwordUpdateValidation, profileUpdateValidation } from '../../utils/schemas'
import _ from 'lodash'
import { CircularProgress } from '@mui/material'
import deleteIcon  from '../../assets/images/delete.svg'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import MetaData from '../../components/MetaData';
import defaultUser from '../../assets/images/defaultUser.png'
import cameraIcon from '../../assets/images/camera.svg'

function Profile() {
    const [edit, setEdit] = useState(false)
    const [editPassword, setEditPassword] = useState(false)
    const [editAddress, setEditAddress] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [imageData, setImageData] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const  userDetailsReducer = useSelector(state=> state.userDetailsReducer)
    const  updatePasswordReducer = useSelector(state=> state.updatePasswordReducer)
    const  userAddressReducer = useSelector(state=> state.userAddressReducer)

    const userDetailsFormRef = useRef();
    const userAddressFormRef = useRef();
    const dispatch = useDispatch()


    const handleEdit = (reset)=>{
        setEdit(prev => !prev)
        reset()
    }
    
    const handleDeleteAccount = ()=>{
        dispatch(deleteAccount())
    }


    useEffect(()=>{
        if(!userDetailsReducer.userDetails){
            dispatch(getUserProfileData())
        }

        if(!userAddressReducer.userAdress){
            dispatch(getUserAddress())
        }
    }, [])

    useEffect(()=>{
        if(imageData){
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              setImageSrc(reader.result);
            });
            reader.readAsDataURL(imageData);
          }
    }, [imageData])

    useEffect(()=>{
        if(!userDetailsReducer.loading && !userDetailsReducer.error){
            setEdit(false)
        }else{
            userDetailsFormRef.current?.resetForm()
        }
    }, [userDetailsReducer.userDetails])

    useEffect(()=>{
        if(!userAddressReducer.loading && !userAddressReducer.error){
            setEditAddress(false)
        }else{
            userAddressFormRef.current?.resetForm()
        }
    }, [userAddressReducer.userAddress])


  return (
    <div className='profile-container container-xl my-5'>
        <MetaData title={`Profile | BAZZAR.com`} />
        <Formik
            initialValues={{
                profile_pic:'',
                firstName: userDetailsReducer.userDetails?.first_name || '', 
                lastName: userDetailsReducer.userDetails?.last_name || '',
                email: userDetailsReducer.userDetails?.email,
                phoneNo: userDetailsReducer.userDetails?.phone.split('-')[1],
            }}
            innerRef={(f) => (userDetailsFormRef.current = f)}
            enableReinitialize
            validationSchema={profileUpdateValidation}
            onSubmit= {(values, actions)=>{
                    dispatch(updateUserDetails({...values, phoneNo: '+91-' + values.phoneNo, profile_pic: imageData}))
                }}
            >
            {
                (formik)=>{
                    return (
                        <div>
                            <div className="heading">
                                Personal Information
                                <button className='edit-btn' onClick={()=>{handleEdit(formik.resetForm)}} disabled={userDetailsReducer.loading}>{edit ? 'Cancel' : 'Edit'}</button>
                            </div>
                            <div className="content">
                                <Form>
                                    <div>
                                        <div className='img-container'>
                                            <div className='img-box'>
                                                <img src={imageSrc || userDetailsReducer?.userDetails?.profile_pic?.url || (!userDetailsReducer.loading && defaultUser)} alt="" />
                                            </div>
                                            {
                                                edit && 
                                                <div className="image-upload">
                                                    <div className="inner">
                                                        <img src={cameraIcon} alt="" />
                                                        <Field type="file" name="profile_pic" accept="image/*" id="upload-btn" onChange={(e) => { setImageData(e.target.files[0]); formik.setFieldValue('profile_pic', e.target.value);}}/>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        <div className="field">
                                            <div className="field-name">Full Name</div>
                                            <div className="d-flex flex-column flex-sm-row">
                                                <div className="field-box">
                                                    <Field type="text" name='firstName' placeholder='First Name' className='me-2' disabled={!edit}  autoComplete='off'/>
                                                    <div className="error">
                                                        <ErrorMessage name='firstName'/>
                                                    </div>
                                                </div>
                                                <div className="field-box">
                                                    <Field type="text" name='lastName' placeholder='Last Name' disabled={!edit}  autoComplete='off'/>

                                                    <div className="error">
                                                            <ErrorMessage name='lastName'/>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="field">
                                            <div className="field-name">Email Address</div>
                                            <div className="field-box">
                                                <Field type="email" name='email' placeholder='Email'  disabled={!edit}  autoComplete='off'/>
                                                <div className="error">
                                                    <ErrorMessage name='email'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field">
                                            <div className="field-name">Mobile Number</div>
                                            <div className="field-box">
                                                <div className="d-flex tel-input align-items-center">
                                                    <div className='country-code mx-2'>+91</div>
                                                    <Field type="tel" maxLength={'10'} name='phoneNo' placeholder='Mobile Number' className='me-2' disabled={!edit}  autoComplete='off'/>
                                                </div>
                                                <div className="error">
                                                    <ErrorMessage name='phoneNo'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {edit && <button className='save-btn' type='submit' disabled={userDetailsReducer.loading ||!formik.isValid || _.isEqual(formik.values, {
                                        profile_pic: '',
                                        firstName: userDetailsReducer.userDetails?.first_name , 
                                        lastName: userDetailsReducer.userDetails?.last_name,
                                        email: userDetailsReducer.userDetails?.email,
                                        phoneNo: userDetailsReducer.userDetails?.phone.split('-')[1],
                                    })}>
                                        {
                                            userDetailsReducer.loading ?                                                            
                                            <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>
                                            :
                                            'Save'
                                        } 
                                    </button>}
                                </Form>
                            </div>
                        </div>
                    )
                }
            }

        </Formik>
        
        <Formik
            initialValues={{
                country: userAddressReducer.userAddress?.country,
                city: userAddressReducer.userAddress?.city,
                state: userAddressReducer.userAddress?.state,
                address: userAddressReducer.userAddress?.address,
                locality: userAddressReducer.userAddress?.locality,
                pinCode: userAddressReducer.userAddress?.pinCode
            }}
            enableReinitialize
            innerRef={(f) => (userAddressFormRef.current = f)}
            validationSchema={addressUpdateValidation}
            onSubmit= {(values, resetForm)=>{
                    dispatch(updateUserAddress(values))
                }}
            >
            {
                (formik)=>{
                    return (
                        <div className='mt-5'>
                            <div className="heading">
                                Address
                                <button className='edit-btn' onClick={()=>{setEditAddress(prev => !prev); formik.resetForm()}}>{editAddress ? 'Cancel' : 'Edit'}</button>
                            </div>
                            <div className="content">
                                <Form>
                                    <div>
                                        <div className="d-flex flex-column flex-sm-row">
                                            <div className="field">
                                                <div className="field-name">Pin Code</div>
                                                <div className="field-box">
                                                    <Field type="tel" maxLength='6' name='pinCode' placeholder='Pin Code' className='me-2' disabled={!editAddress}  autoComplete='off'/>
                                                    <div className="error">
                                                        <ErrorMessage name='pinCode'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="field">
                                                <div className="field-name">Locality</div>
                                                <div className="field-box">
                                                    <Field type="text" name='locality' placeholder='Locality'  disabled={!editAddress}  autoComplete='off'/>
                                                    <div className="error">
                                                        <ErrorMessage name='locality'/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field">
                                            <div className="field-name">Address</div>
                                            <div className="field-box address">
                                                <Field type="text" as='textarea' name='address' placeholder='Address' className='me-2' disabled={!editAddress}  autoComplete='off'/>
                                                <div className="error">
                                                    <ErrorMessage name='address'/>
                                                </div>
                                            </div>
                                        </div>
                                            
                                        <div className="d-flex flex-column flex-sm-row">
                                            <div className="field">
                                                <div className="field-name">City</div>
                                                <div className="field-box">
                                                    <Field type="text" name='city' placeholder='City' className='me-2' disabled={!editAddress}  autoComplete='off'/>
                                                    <div className="error">
                                                        <ErrorMessage name='city'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="field">
                                                <div className="field-name">State</div>
                                                <div className="field-box">
                                                    <Field type="text" name='state' placeholder='State'  disabled={!editAddress}  autoComplete='off'/>
                                                    <div className="error">
                                                        <ErrorMessage name='state'/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>  
                                        <div className="field">
                                            <div className="field-name">Country</div>
                                            <div className="field-box">
                                                <Field type="text" name='country' placeholder='Country'  disabled={!editAddress}  autoComplete='off'/>
                                                <div className="error">
                                                    <ErrorMessage name='country'/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {editAddress && <button className='save-btn' type='submit' disabled={userAddressReducer.loading ||!formik.isValid || !formik.dirty}>
                                    {
                                        userAddressReducer.loading ?                                                            
                                        <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>
                                        :
                                        'Save'
                                    } 
                                    </button>}
                                </Form>
                            </div>
                        </div>
                    )
                }
            }

        </Formik>

        <Formik
            initialValues={{
                oldPassword: '',
                newPassword: '', 
                confirmPassword: ''
            }}
            validateOnMount={true} 
            validationSchema={passwordUpdateValidation}
            onSubmit= {(values, actions)=>{
                    dispatch(updatePassword(values))
                    actions.resetForm()
                    setEditPassword(false)
                }}
            >
            {
                (formik)=>{
                    return (
                        <div className='mt-5'>
                            <div className="heading">
                                Change Password
                                <button className='edit-btn' onClick={()=>{ setEditPassword(prev => !prev); formik.resetForm()}}>{editPassword ? 'Cancel' : 'Edit'}</button>
                            </div>
                            <div className="content">
                                <Form>
                                    <div>
                                        <div className="field">
                                            <div className="field-name">Old Password</div>
                                            <div className="field-box">
                                                <Field type="password" name='oldPassword' placeholder='Old Password' className='me-2' disabled={!editPassword}  autoComplete='off'/>
                                                <div className="error">
                                                    <ErrorMessage name='oldPassword'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field">
                                            <div className="field-name">New Password</div>
                                            <div className="field-box">
                                                <Field type="password" name='newPassword' placeholder='New Password' className='me-2' disabled={!editPassword}  autoComplete='off'/>
                                                <div className="error">
                                                    <ErrorMessage name='newPassword'/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="field">
                                            <div className="field-name">Confirm Password</div>
                                            <div className="field-box">
                                                <Field type="password" name='confirmPassword' placeholder='Confirm Password'  disabled={!editPassword}  autoComplete='off'/>
                                                <div className="error">
                                                    <ErrorMessage name='confirmPassword'/>
                                                </div>
                                            </div>
                                        </div>

                                        
                                    </div>
                                    {editPassword && <button className='save-btn' type='submit' disabled={updatePasswordReducer.loading ||!formik.isValid ||  !formik.dirty}>
                                        {
                                            updatePasswordReducer.loading ?                                                            
                                            <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/>
                                            :
                                            'Save'
                                        } 
                                    </button>}
                                </Form>
                            </div>
                        </div>
                    )
                }
            }

        </Formik>

        <div className='deactivate-btn' onClick={()=>{setDeleteModal(true)}}> <img src={deleteIcon} alt=""/> &nbsp; Delete Account</div>
        <DeleteModal
            deleteModal={deleteModal} 
            setDeleteModal={setDeleteModal}
            name="account"
            onDelete = {handleDeleteAccount }
        />
    </div>
  )
}

export default Profile