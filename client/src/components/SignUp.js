import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import signpic from "../images/signup.svg";

const SignUp = () => {

    const history = useHistory();
    const [user, setUser] = useState({
      name:"", email:"", phone:"", work:"", password:"", cpassword:"" 
    });

    let name, value;
    const handleInputs=(e)=>{
      name = e.target.name;
      value = e.target.value;

      setUser({...user, [name]:value});
    }

    // Connecting client singnup page to server
    const PostData = async (e)=>{
        e.preventDefault();

        const {name, email, phone, work, password, cpassword } = user;
        
        const res = await fetch("/register",
        {
          method: "POST",
          headers: {
                "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            name, email, phone, work, password, cpassword
          })
        });

        const data = await res.json();

        if(data.status === 422 || !data){
          window.alert("Invalid Registration!");
          console.log("Invalid Registration!")
        } else {
          window.alert("Registration Successfull");
          console.log("Registration Successfull");

          history.push("/login");
        }
    }


  return (
    <>
      <section className="signup">
      <div className="container mt-5">
      <div className="signup-content">
      <div className="signup-form">
      <h2 className="form-title">Sign Up</h2>
                  <form method="POST" className="register-form" id="register-form">

                    <div className="form-group">
                      <label htmlFor="name">
                          <i class="zmdi zmdi-account"></i>
                      </label>
                      <input type="text" name="name" id="name" autoComplete="off" 
                      value={user.name} onChange={handleInputs} placeholder="Your Name" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                          <i class="zmdi zmdi-email"></i>
                      </label>
                      <input type="email" name="email" id="email" autoComplete="off" 
                      value={user.email} onChange={handleInputs} placeholder="Your Email" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">
                        <i class="zmdi zmdi-phone"></i>
                      </label>
                      <input type="number" name="phone" id="phone" autoComplete="off" 
                      value={user.phone} onChange={handleInputs} placeholder="Your Phone No" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="work">
                         <i class="zmdi zmdi-case"></i>
                      </label>
                      <input type="text" name="work" id="work" autoComplete="off" 
                      value={user.work} onChange={handleInputs} placeholder="Your Profession" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">
                       <i class="zmdi zmdi-lock"></i>
                      </label>
                      <input type="password" name="password" id="password" autoComplete="off" 
                      value={user.password} onChange={handleInputs} placeholder="Your Password" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cpassword">
                        <i class="zmdi zmdi-lock-open"></i>
                      </label>
                      <input type="password" name="cpassword" id="cpassword" autoComplete="off" 
                      value={user.cpassword} onChange={handleInputs} placeholder="Confirm Password" />
                    </div>
                    

                    <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup" className="form-submit" value="Register "
                        onClick={PostData} />
                    </div>

                  </form>
                  </div>
                    <div className="signup-image">
                      <figure>
                        <img src={signpic} alt="registration pic" />
                      </figure>
                      <NavLink to="/login" className="signu8p-image-link">I am already registered</NavLink>
                    </div>
              </div>
        </div>
      </section>
   </>
    )
}

export default SignUp;