import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, createProduct, updateProduct, deleteProduct } from '../../../store/actions/AdminActions/AdminAction';
import { createProductValidation } from '../../../utils/schemas';
import './AdminProducts.scss';
import SearchBox from '../../../components/SearchBox/SearchBox';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CircularProgress } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaTimes, FaCloudUploadAlt } from 'react-icons/fa';
import CustomSelect from '../../../components/CustomSelect/CustomSelect';
// import { storage } from '../../../firebase/config';

const initialProductValues = {
  name: '',
  description: '',
  price: '',
  images: [''],
  category: '',
  discountPercentage: '',
  stock: ''
};

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = {};
  const [uploadingImages, setUploadingImages] = useState(false);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  if (error) {
    console.error('Error fetching products:', error);
  }

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    discountPercentage: 0,
    stock: '',
  });
  const [editProductId, setEditProductId] = useState(null);

  const handleModalClose = () => {
    setShowModal(false);
    setProductData({
      name: '',
      price: '',
      description: '',
      category: '',
      discountPercentage: 0,
      stock: '',
    });
    setEditProductId(null);
  };

  const handleModalShow = (type, product = null) => {
    setModalType(type);
    if (type === 'edit' && product) {
      setProductData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        stock: product.stock,
      });
      setEditProductId(product._id);
    }
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleImageUpload = async (files, setFieldValue, values) => {
    setUploadingImages(true);
    const uploadedUrls = [];
let storage=null
    try {
      for (const file of files) {
        const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(url);
      }
      
      setFieldValue('images', [...values.images, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploadingImages(false);
    }
  };

  return (
    <div className='admin-products'>
      <div className="d-flex bg-light opacity-75 position-sticky top-0 justify-content-between align-items-center shadow-sm p-4 py-3 mb-4" style={{ zIndex: 999 }}>
        <h4 className="mb-0 d-flex align-items-center ms-4 ms-lg-0">
          Products Management
        </h4>
        <Button variant="primary" onClick={() => handleModalShow('create')}>
          Add Product
        </Button>
      </div>
      <div className="content container-fluid px-2 px-lg-4">
        <div className="row mb-2">
          <div className="col-lg-6 col-xl-3 mb-4"></div>
          <div className="col-lg-6 col-xl-3 mb-4"></div>
          <div className="col-lg-6 col-xl-3 mb-4">
            <SearchBox width={'100%'} />
          </div>
          <div className="col-lg-6 col-xl-3 mb-4"></div>
        </div>
        <div className="product-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Button variant="warning" size="sm" onClick={() => handleModalShow('edit', product)}>
                        Edit
                      </Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for Create/Edit Product */}
      <Modal show={showModal} className='create-product-modal' onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'create' ? 'Add Product' : 'Edit Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={modalType === 'create' ? initialProductValues : productData}
            validationSchema={createProductValidation}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (modalType === 'create') {
                  dispatch(createProduct(values));
                } else {
                  dispatch(updateProduct(editProductId, values));
                }
              } catch (error) {
                console.error('Error submitting form:', error);
              } finally {
                setSubmitting(false);
                handleModalClose();
              }
            }}
          >
            {({ isSubmitting, isValid, dirty, values, setFieldValue }) => (
              <Form>
                <div className="field">
                  <div className="field-name">Product Name</div>
                  <div className="field-box">
                    <Field type="text" name="name" placeholder="Enter product name" autoComplete="off" />
                    <div className="error">
                      <ErrorMessage name="name" />
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="field-name">Description</div>
                  <div className="field-box">
                    <Field as="textarea" name="description" placeholder="Enter description" autoComplete="off" />
                    <div className="error">
                      <ErrorMessage name="description" />
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="field-name">Price</div>
                  <div className="field-box">
                    <Field type="number" name="price" placeholder="Enter price (min 100)" autoComplete="off" />
                    <div className="error">
                      <ErrorMessage name="price" />
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="field-name">Images</div>
                  <div className="image-upload-container">
                    <button type="button" className="browse-files-btn">
                      <FaCloudUploadAlt className="upload-icon" />
                      Browse Files
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files, setFieldValue, values)}
                      />
                    </button>
                    
                    {uploadingImages && (
                      <div className="upload-progress">
                        <CircularProgress size={20} />
                        <span>Uploading images...</span>
                      </div>
                    )}

                    <div className="image-preview-container">
                      {values.images.map((url, index) => (
                        <div key={index} className="image-preview-item">
                          <img src={url} alt={`Product ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => setFieldValue('images', values.images.filter((_, i) => i !== index))}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="field-name">Category</div>
                  <div className="field-box">
                    <CustomSelect/>
                    <div className="error">
                      <ErrorMessage name="category" />
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="field-name">Discount Percentage</div>
                  <div className="field-box">
                    <Field type="number" name="discountPercentage" placeholder="Enter discount percentage (optional)" autoComplete="off" />
                    <div className="error">
                      <ErrorMessage name="discountPercentage" />
                    </div>
                  </div>
                </div>

                <div className="field">
                  <div className="field-name">Stock</div>
                  <div className="field-box">
                    <Field type="number" name="stock" min={0} max={1000}  placeholder="Enter stock quantity" autoComplete="off" />
                    <div className="error">
                      <ErrorMessage name="stock" />
                    </div>
                  </div>
                </div>

                <div className="modal-footer mt-2">

                  <button 
                  className='cancel-btn'
                    
                    onClick={handleModalClose}
                  >
                    Cancel
                  </button>

                  <button 
                    className='save-btn' 
                    type='submit' 
                    disabled={isSubmitting || !isValid || !dirty}
                  >
                    {isSubmitting ? 
                      <CircularProgress size={20} thickness={8} sx={{color: 'black', opacity: 1}}/> : 
                      (modalType === 'create' ? 'Add Product' : 'Update Product')
                    }
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminProducts;