import React from 'react'
import playStore from '../../../assets/images/googlePlay.png'
import appleStore from '../../../assets/images/appleStore.svg'
import {ImLocation} from 'react-icons/im'
import {BsFillTelephoneFill} from 'react-icons/bs'
import {GrMail} from 'react-icons/gr'
import {FaFacebookSquare, FaInstagram, FaYoutube, FaTwitterSquare} from 'react-icons/fa'
import './Footer.scss'
import { Col, Row } from 'react-bootstrap'

function Footer() {
  return (
    <div id="footer">
      <div  className='w-100 py-5 px-3 px-sm-5 text-light'>
        <Row className="container-fluid">
          <Col sm="6" lg="3" className='box'>
            <div className='heading logo'>
              BAZZAR.com
            </div>
            <div className="content">
              <div>© 2023 Flone.</div>
              <div>All Rights Reserved</div>
            </div>
          </Col>

          <Col sm="6" lg="3" className='box'>
            <div className='heading'>
              Contact
            </div>
            <div className="content">
              <div> <ImLocation/> 123 XYZ, Indore, India</div>
              <div><BsFillTelephoneFill/> +91 99894-55555</div>
              <div><GrMail/> xyz@gmail.com</div>
            </div>
          </Col>

          <Col sm="6" lg="3" className='box'>
            <div className='heading'>
              Follow Us
            </div>
            <div className='content d-flex'>
              <span className='me-2 fs-4'><FaFacebookSquare/></span>
              <span className='me-2 fs-4'><FaTwitterSquare/></span>
              <span className='me-2 fs-4'><FaInstagram/></span>
              <span className='me-2 fs-4'><FaYoutube/></span>
            </div>
          </Col>

          <Col sm="6" lg="3" className='box'>
            <div className='heading' >Download App</div>
            <div className="content">
              <div>Available On Google Play Services & App Store</div>
              <div style={{width: "150px", marginTop: "15px"}}>
                <div className='my-2'><img src={playStore} width="100%" alt="" /></div>
                <div><img src={appleStore} width="100%" alt="" /></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className='bg-dark text-light text-center py-2'>
        © Developed By Juhi
      </div>
    </div>
  )
}

export default Footer