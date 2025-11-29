import React from 'react'
import MetaData from '../../components/MetaData';
import './About.scss'

function About() {
  return (
    <div className='about-page  container-xxl'>
      <MetaData title={`About | BAZZAR.com`} />
      <div className='p-5 m-5 content text-justify'>
        <h3 className='mb-5'>Welcome to Bazzar.com,</h3>
         Your number one source for all things shopping. We're dedicated to giving you the very best products, with a focus on quality, customer service, and uniqueness.
        <br/><br/>
        Founded in 2024, Bazzar.com has come a long way from its beginnings as a small online store. When we first started out, our passion for providing the best online shopping experience drove us to do intense research and give customers top-notch products. We now serve thousands of customers worldwide and are thrilled to be a part of the eco-friendly, sustainable shopping community.
        <br/><br/>
        Our mission is to make shopping easy, enjoyable, and reliable by offering a wide range of products, competitive prices, and outstanding customer support. Whether you're looking for the latest gadgets, fashion, home goods, or unique gifts, Bazzar.com is your go-to marketplace.
        <br/><br/>
        Thank you for choosing Bazzar.com. We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
      </div>
      </div>
  )
}

export default About