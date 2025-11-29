exports.welcomeEmail = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <style type="text/css" media="all">
      body{
        font-family: Sans-Serif !important;
        margin: 0;
        background-color: aliceblue;

      }
      
      .container{
        background-color: white;
        padding: 10px;
        max-width: 580px;
        margin: 10px auto;
      }
      
      .banner{
        background-color: aliceblue;
        padding: 20px;
        border-radius: 0 0 50% 50%;
      }

      
      .banner-logo{
        width: fit-content;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .logo-name{
        font-weight: 600;
        margin-left: 20px;
        font-size: 20px;
      }
      
      .content{
        margin: 10px auto;
        padding: 20px;
        text-align: center;
        margin-bottom: 20px;
      }
      
      .shop-btn{
        text-decoration: none;
        color: white;
        background-color: #31C3E8;
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
        opacity: 0.7;
      }
      
      .shop-btn:hover{
        opacity: 1;
      }
      
      .footer{
        background-color: #f9f9f9;
        line-height: 16px;
        text-align: center;
        font-size: 11.5px;
      }
      
      .footer-top{
        padding: 10px;
      }
      .footer-bottom{
        background-color: #163766;
        color: white;
        font-size: 10px;
        text-align: center;
        padding: 10px 0;
      }
    </style>
  </head>
  <body>
      <div class="container">
        <div class="banner">
        <div class="banner-logo">
          <img width="40px" src="https://firebasestorage.googleapis.com/v0/b/syn-ananda-resort-187-bucket-dev/o/contents%2FBlog%2Flogo.png?alt=media&token=bb571bdf-780e-4c20-9342-9f26c0e3c184&_gl=1*13oxbq8*_ga*NjgyOTcxMjI4LjE2OTcxODM2NjQ.*_ga_CW55HF8NVT*MTY5Nzg4NDg2OC40LjEuMTY5Nzg4NDg5Ni4zMi4wLjA." alt="" />
          <span class='logo-name'>BAZZAR.com</span>
        </div>
      </div>
      
      <div class="content">
         <div style="margin-bottom: 30px; color: #000000; font-size: 14px; line-height: 20px;">
              <p>Hey {{user_name}} ! Welcome to BAZZAR.com!</p>
              <p style="margin-bottom: 30px; color: #B3B3B3;">We are more than happy to have you on board. Make yourself at home and enjoy shopping with us.</p>
          </div>
        <div>
          <a class="shop-btn" href="SHOP NOW">SHOP NOW</a>
        </div>
        
      </div>
      
      <div class='footer'>
        <div class="footer-top">
          Regards, BAZZAR.com Team
          <br />
          <p style="color:#163766; font-weight:600; ">For assistance, please contact us at</p>
          +91 xxxxx-xxxxx
          <br />
          support@bazzar.com
        </div>
        <div class="footer-bottom">
          2023 © Copyright BAZZAR.com Pvt. Ltd. All Rights Reserved.
        </div>
      </div>
      </div>
  </body>
</html>`

exports.forgotPasswordEmail = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <style type="text/css" media="all">
      body{
        font-family: Sans-Serif !important;
        margin: 0;
        background-color: aliceblue;

      }
      
      .container{
        background-color: white;
        padding: 10px;
        max-width: 580px;
        margin: 10px auto;
      }
      
      .banner{
        background-color: aliceblue;
        padding: 20px;
        border-radius: 0 0 50% 50%;
      }

      
      .banner-logo{
        width: fit-content;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .logo-name{
        font-weight: 600;
        margin-left: 20px;
        font-size: 20px;
      }
      
      .content{
        margin: 10px auto;
        padding: 20px;
        text-align: center;
        margin-bottom: 20px;
        font-size: 14px;
      }
      
      .shop-btn{
      
        text-decoration: none;
        color: white;
        background-color: #31C3E8;
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
        opacity: 0.7;
      }
      
      .shop-btn:hover{
        opacity: 1;
      }
      
      .footer{
        background-color: #f9f9f9;
        line-height: 16px;
        text-align: center;
        font-size: 11.5px;
      }
      
      .footer-top{
        padding: 10px;
      }
      .footer-bottom{
        background-color: #163766;
        color: white;
        font-size: 10px;
        text-align: center;
        padding: 10px 0;
      }
    </style>
  </head>
  <body>
      <div class="container">
        <div class="banner">
        <div class="banner-logo">
          <img width="40px" src="https://firebasestorage.googleapis.com/v0/b/syn-ananda-resort-187-bucket-dev/o/contents%2FBlog%2Flogo.png?alt=media&token=bb571bdf-780e-4c20-9342-9f26c0e3c184&_gl=1*13oxbq8*_ga*NjgyOTcxMjI4LjE2OTcxODM2NjQ.*_ga_CW55HF8NVT*MTY5Nzg4NDg2OC40LjEuMTY5Nzg4NDg5Ni4zMi4wLjA." alt="" />
          <span class='logo-name'>BAZZAR.com</span>
        </div>
      </div>
      
      <div class="content">
        <div style="margin-bottom: 30px; color: #000000;  line-height: 20px;">
          <p>Hi {{user_name}}, </p>
          <p style="color: #B3B3B3; margin-bottom: 30px;">There was a request to change your password! Please click on the button to reset password.</p>
          <div>
            <a class="shop-btn" href={{reset_link}}>Reset Password</a>
          </div>
        </div>
        <p style="color: #B3B3B3;">If you did not make this request then please ignore this email.</p>
      </div>
      
      <div class='footer'>
        <div class="footer-top">
          Regards, BAZZAR.com Team
          <br />
          <p style="color:#163766; font-weight:600; ">For assistance, please contact us at</p>
          +91 xxxxx-xxxxx
          <br />
          support@bazzar.com
        </div>
        <div class="footer-bottom">
          2023 © Copyright BAZZAR.com Pvt. Ltd. All Rights Reserved.
        </div>
      </div>
      </div>
  </body>
</html>`