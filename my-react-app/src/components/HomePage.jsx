import React from 'react';
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    import("./style.css");
  }, []);
   const navigate = useNavigate();
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>LinkTree</title>
      <div className="header">
        <div className="header_content">
          {/* <a>
            <img src="./images/QuickEdu.svg" alt="QuickEdu" className="logo" />
            <span className="logo_text"></span>
          </a> */}
          <a href="#logo" className="logo_text_anchor">
          Back2Campus
          </a>
        </div>
        <nav className="nav">
          <ul className="navlist">
            <li>
              <a href="#Home" className="navlink">
                Home
              </a>
            </li>
            <li>
              <a href="#Features" className="navlink">
                Features
              </a>
            </li>
            <li>
              <a href="#About" className="navlink">
                About
              </a>
            </li>
            <li>
              <a href="#Contact" className="navlink">
                Contact
              </a>
            </li>

          </ul>
        </nav>
        <div className="flex items-center justify-center  bg-white">
      <div className="nav_button_container">
       
        <Link to="/login">
        <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid" 
     alt="Male User Profile Avatar" 
     width="60" 
     height="60"/>

        </Link>
      </div>
    </div>
        <div className="menu_button">
          <img
            src="./images/Hamburger.svg"
            alt="menu_button"
            className="menu_icon"
          />
        </div>
      </div>
      <div className="hero_container">
        <section className="left_section">
          <div className="content">
           
            <h1 className="content_heading">
              Connect with Alumni
            </h1>
            <p className="content_desc">
              Our Alumni Association Platform offers an effortless and seamless approach to reconnecting alumni with their alma mater. This platform empowers alumni to engage with their juniors, share insights, and contribute to the growth of future generations. Join us on a transformative journey to strengthen the alumni network, foster professional connections, and unlock the full potential of our community.
            </p>
          </div>
          <div className="button_div">
          <button onClick={() => navigate('/signup')} className="start_button" >
            Join Now
        </button>
          </div>
        </section>
        <section className="right_section">
          <div className="image_container">
            <img
              src="https://res.cloudinary.com/dkyyjytbr/image/upload/v1739353222/istockphoto-1127115457-612x612_jb09kz.jpg"
              alt="image"
              className="main_img"
            />
          </div>
        </section>
       </div>
    {/* /*  <div className="trusted_by_container">
        <h2 className="trusted_heading">Trusted by the Best</h2>
        <div className="company_grid">
          <div className="grid_item">
            <div className="company_logo_container">
              <img
                src="./images/Google.svg"
                alt="Google"
                className="company_logo"
              />
            </div>
            <span className="company_name"></span>
          </div>
          <div className="grid_item">
            <div className="company_logo_container">
              <img
                src="./images/Microsoft.svg"
                alt="Microsoft"
                className="company_logo"
              />
            </div>
            <span className="company_name">Microsoft</span>
          </div>
          <div className="grid_item">
            <div className="company_logo_container">
              <img
                src="./images/linkedin-copy.svg"
                alt="LinkedIn"
                className="company_logo"
              />
            </div>
            <span className="company_name">LinkedIn</span>
          </div>
          <div className="grid_item">
            <div className="company_logo_container">
              <img
                src="./images/VectorEdu.svg"
                alt="VectorEdu"
                className="company_logo"
              />
            </div>
            <span className="company_name">VectorEdu</span>
          </div>
        </div>
      </div>   */}
      <div id='Features' className="feature_container ">
        <div className="feature_title_container">
          <h2 className="feature_title">Our Prominent Features</h2>
          <p className="feature_heading_desc">
          Our Alumni Association Platform is designed to strengthen the bond between alumni and students, fostering professional and personal growth. Here are some of the key features that make our platform unique:

          </p>
        </div>
        <div className="feature_grid">
          {/*feature 1 card*/}
          <div className="feature_grid_item">
          <div className="feature_img_container">
    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      alt="Alumni Networking"
      className="feature_img"
    />
  </div>
  <div className="feature_desc_container">
    <h2 className="feature_heading">Alumni Networking</h2>
    <p className="feature_desc">
      Facilitate connections between alumni and current students, enabling professional networking and mentorship opportunities.
    </p>
  </div>
</div>

{/* Feature 2 */}
<div className="feature_grid_item">
  <div className="feature_img_container">
    <img
      src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
      alt="Inclusive Community"
      className="feature_img"
    />
  </div>
  <div className="feature_desc_container">
    <h2 className="feature_heading">Inclusive Community</h2>
    <p className="feature_desc">
      Build a supportive community where alumni from various backgrounds can engage and collaborate on shared interests.
    </p>
  </div>
</div>

{/* Feature 3 */}
<div className="feature_grid_item">
  <div className="feature_img_container">
    <img
      src="https://cdn-icons-png.flaticon.com/512/2643/2643369.png"
      alt="Career Opportunities"
      className="feature_img"
    />
  </div>
  <div className="feature_desc_container">
    <h2 className="feature_heading">Career Opportunities</h2>
    <p className="feature_desc">
      Provide a platform for alumni to share job opportunities, internships, and career advice with fellow alumni and students.
    </p>
  </div>
</div>

{/* Feature 4 */}
<div className="feature_grid_item">
  <div className="feature_img_container">
    <img
      src="https://cdn-icons-png.flaticon.com/512/2951/2951022.png"
      alt="Event Hosting"
      className="feature_img"
    />
  </div>
  <div className="feature_desc_container">
    <h2 className="feature_heading">Event Hosting</h2>
    <p className="feature_desc">
      Enable alumni to organize virtual or in-person events, webinars, and reunions to stay connected with each other.
    </p>
  </div>
</div>

{/* Feature 5 */}
<div className="feature_grid_item">
  <div className="feature_img_container">
    <img
      src="https://cdn-icons-png.flaticon.com/512/2111/2111368.png"
      alt="Mentorship Programs"
      className="feature_img"
    />
  </div>
  <div className="feature_desc_container">
    <h2 className="feature_heading">Mentorship Programs</h2>
    <p className="feature_desc">
      Facilitate mentorship programs where experienced alumni can guide and support the career development of younger graduates.
    </p>
  </div>
</div>

          {/*feature 6 card*/}
          <div className="feature_grid_item">
            <div className="feature_img_container">
              <img
               src="https://cdn-icons-png.flaticon.com/512/2504/2504910.png"
                alt="feature_img"
                className="feature_img"
              />
            </div>
            <div className="feature_desc_container">
            <h2 className="feature_heading">Alumni Insights</h2>
    <p className="feature_desc">
      Offer alumni-driven insights and discussions to help everyone grow personally and professionally through shared experiences.
    </p>
            </div>
          </div>
        </div>  
      </div>
      <div className="testimonial_container">
         <div className="testimonial_content">
          <h2 className="testimonial_title">What Others Say About Us</h2>
        {/* start */}
        <div className="testimonial_grid">
  {/* Testimonial card 1 */}
  <div className="testimonial_card">
    <div className="testimonial_text">
      “The Alumni Association Platform helped me reconnect with old classmates and mentor juniors. It’s been an incredible experience sharing knowledge and collaborating on projects with alumni from diverse fields.”
    </div>
    <div className="testimonial_avatar_container">
      <img
       src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="avatar"
        className="testimonial_avatar"
      />
    </div>
    <div id='About' className="testimonial_details">
      <h3 className="testimonial_name">John Smith</h3>
      <p className="testimonial_desc">Software Engineer, Class of 2010</p>
    </div>
  </div>

  {/* Testimonial card 2 */}
  <div className="testimonial_card">
    <div className="testimonial_text">
      “Thanks to the Alumni Platform, I’ve found great opportunities to contribute to my alma mater. Whether it's giving guest lectures or offering career advice, it has been fulfilling to stay involved.”
    </div>
    <div className="testimonial_avatar_container">
      <img
       src="https://cdn-icons-png.flaticon.com/512/168/168734.png"
        alt="avatar"
        className="testimonial_avatar"
      />
    </div>
    <div className="testimonial_details">
      <h3 className="testimonial_name">Emily Clark</h3>
      <p className="testimonial_desc"> Specialist Programmer, Class of 2015</p>
    </div>
  </div>

  {/* Testimonial card 3 */}
  <div className="testimonial_card">
    <div className="testimonial_text">
      “Being part of the Alumni Association has given me an excellent platform to support my juniors with career advice and internships. It’s amazing to see the strong bond between the alumni and current students.”
    </div>
    <div className="testimonial_avatar_container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
        alt="avatar"
        className="testimonial_avatar"
      />
    </div>
    <div className="testimonial_details">
      <h3 className="testimonial_name">David Lee</h3>
      <p className="testimonial_desc">Data Analyst, Class of 2012</p>
    </div>
  </div>
</div>

  
        </div>
      </div>
      {/* // */}
      <div className="newsletter_container">
        <div className="newsletter_content">
          <section className="newsletter_left">
            <img  src="https://t3.ftcdn.net/jpg/02/93/37/28/360_F_293372811_2gpgNsJ3TQSPsfAbmBPIYfuKfAw70bpt.jpg  " alt="img" className="newsletter_img" />
          </section>
          <section className="newsletter_right">
            <div className="newsletter_info">
              <h2 className="newsletter_title">Get the latest updates</h2>
              <p className="newsletter_desc">Sign up for our newsletter</p>
              <form action="" className="newsletter_form">
                <input
                  type="text"
                  name="email"
                  className="newsletter_email"
                  placeholder="E-mail"
                />
                <button className="newsletter_button">Subscribe</button>
              </form>
              <div className="privacy_policy">
                By signing up yo our newsletter you agree to our
                <a href="#terms&condition" className="newletter_link">
                  Terms of Service
                </a>
                and
                <a href="#privacy" className="newsletter_link">
                  Privacy Policy
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="footer_container">
        <footer className="footer">
          <div className="footer_up">
            <div className="footer_left">
              <div className="footer_logo_container">
                <a href="#logo" className="footer_logo_link">
                <img
              src="/"
             
              className="footer_logo"
            />
             Back2Campus
                </a>
                <p className="footer_text">
                  Connecting Alumni for a Brighter Future.
                </p>
              </div>
              <div className="social_logo_container">
                <a href="#social" className="social_link">
                <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              className="social_logo"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
              alt="LinkedIn"
              className="social_logo"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt="Twitter"
              className="social_logo"
            />
                  <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png"
              alt="GitHub"
              className="social_logo"
            />
                </a>
              </div>
            </div>
            <div className="footer_grid">
              {/*column 1*/}
              <div className="footer_grid_column">
                <h3 className="footer_grid_heading">About Us</h3>
                <ul className="footer_link_list">
                  <li>
                    <a href="#footerlink">Our Mission</a>
                  </li>
                  <li>
                    <a href="#footerlink">Our Team</a>
                  </li>
                  <li>
                    <a href="#footerlink">History</a>
                  </li>
                  <li>
                    <a href="#footerlink">Contact</a>
                  </li>
                </ul>
              </div>
              {/*column 2*/}
              <div className="footer_grid_column">
                <h3 className="footer_grid_heading">Resources</h3>
                <ul className="footer_link_list">
                  <li>
                    <a href="#footerlink">Events</a>
                  </li>
                  <li>
                    <a href="#footerlink">News</a>
                  </li>
                  <li>
                    <a href="#footerlink">Blog</a>
                  </li>
                  <li>
                    <a href="#footerlink">FAQs</a>
                  </li>
                </ul>
              </div>
              {/*column 3*/}
              <div className="footer_grid_column">
                <h3 className="footer_grid_heading">Get Involved</h3>
                <ul className="footer_link_list">
                  <li>
                    <a href="#footerlink">Volunteer</a>
                  </li>
                  <li>
                    <a href="#footerlink">Donate</a>
                  </li>
                  <li>
                    <a href="#footerlink">Mentorship</a>
                  </li>
                  <li>
                    <a href="#footerlink">Alumni Stories</a>
                  </li>
                </ul>
              </div>
              {/*column 4*/}
              <div className="footer_grid_column">
                <h3 className="footer_grid_heading">Legal</h3>
                <ul className="footer_link_list">
                  <li>
                    <a href="#footerlink">Terms of Service</a>
                  </li>
                  <li>
                    <a href="#footerlink">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#footerlink">Cookie Settings</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer_down">
            <p>© 2024 - Present Alumni Association. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>

  );
};

// export default HomePage;
