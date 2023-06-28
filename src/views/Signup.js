import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider";

export default function Signup() {
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = event => {
    event.preventDefault()

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient.post('signup', payload).then(({ data }) => {
      setUser(data.user)
      setToken(data.token);
    }).catch(err => {
      const response = err.response;
      if (response && response.status ===422) {
        setErrors(response.data.errors)
      }
    })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Create a free account
          </h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Enter full name" />
          <input ref={emailRef} type="email" placeholder="Enter email address" />
          <input ref={passwordRef} type="password" placeholder="Enter password" />
          <button className="btn btn-block">Submit</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}
