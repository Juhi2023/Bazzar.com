import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './Home.scss'
import { Col, Row } from 'react-bootstrap';
import { servicesData } from '../../data/servicesData';
import { createSearchParams, useNavigate } from 'react-router-dom';
import MetaData from '../../components/MetaData';
import { offerData } from '../../data/offerData';
import mobile from '../../assets/images/mobile.jpg'


function Home() {
  const navigate = useNavigate()

  return (
    <div className='home-container'>
      <MetaData title={`Home | BAZZAR.com`} />

      <div className='carousel-bg py-5'>
        <div className='carousel-container text-center'>
        
          <div>
            <Carousel data-bs-theme="dark"  controls={false}>
              <Carousel.Item>
                <div> <div className='first-heading'>Sale 20% Off</div> <div className="second-heading">On Everything</div></div>
                <div className='content'>Nulla vitae elit libero, a pharetra augue mollis interdum.</div>
              </Carousel.Item>
              <Carousel.Item>
                <div> <div className='first-heading'>Sale 20% Off</div> <div className="second-heading">On Everything</div></div>
                <div className='content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              </Carousel.Item>
              <Carousel.Item>
                <div> <div className='first-heading'>Sale 20% Off</div> <div className="second-heading">On Everything</div></div>
                <div className='content'>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </div>
              </Carousel.Item>
            </Carousel>
          </div>

          <div>
            <button className='shop' onClick={()=>{navigate("/products")}}>Shop Now</button>
          </div>
        </div>
      </div>

      <div>
        <div className='container-xxl px-2 px-xxl-5'>
          <div className="service-box my-5">
            <Row style={{gridRowGap: "15px"}}>
            {
              servicesData.map((item, index)=>{
                return(
                  <Col sm="6" xl="3" className='align-items-center' key={index}>
                    <div className="service-item rounded-2 py-4 justify-content-center d-flex align-items-center">
                      <div className="icon animated pe-3">{item.icon}</div>
                      <div className="content">
                        <div className="heading">{item.title}</div>
                        <div className="description">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              })
            }
            </Row>
          </div>
        </div>
        
        <div className='container-xxl px-2 px-xxl-5'>
          <div className="heading">Best Deals</div>
          <div className="category-box">
            {
              offerData?.map((item, index)=>(
                <div className="category-item" key={index} onClick={()=>{navigate(item.link)}}>
                  <div className='img-container'><img src={item.path} alt="" /></div>
                  <div className="description">
                    <div className="title"> {item.title} </div>
                    <div className="details text-success"> {item.description} </div>
                    <div>SHOP NOW</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        

        <div className="banner">
          <div className="d-flex justify-content-center align-items-center h-100 container-xxl px-5">
            <img src={mobile} height={'50%'} alt="" className='d-none d-md-block' />
            <div className='content'>
              <div className="title">New Arrivals</div>
              <div>Vitae fugiat laboriosam officia perferendis provident aliquid voluptatibus dolorem, fugit ullam sit earum id eaque nisi hic? Tenetur commodi, nisi rem vel, ea eaque ab ipsa, autem similique ex unde!</div>
              <button className='shop' onClick={()=>{navigate("/products")}}>Shop Now</button>
            </div>
          </div>
        </div>

        <div className='container-xxl px-2 px-xxl-5'>
          <div className="heading">Best Deals</div>
          <div className="category-box">
            {
              offerData?.map((item, index)=>(
                <div className="category-item" key={index} onClick={()=>{navigate(item.link)}}>
                  <div className='img-container'><img src={item.path} alt="" /></div>
                  <div className="description">
                    <div className="title"> {item.title} </div>
                    <div className="details text-success"> {item.description} </div>
                    <div>SHOP NOW</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home