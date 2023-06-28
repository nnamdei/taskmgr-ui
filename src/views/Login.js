import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";

export default function Login() {

  const emailRef = createRef()
  const passwordRef = createRef()
  const {setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = event => {
    event.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient.post('login', payload).then(({ data }) => {
      setUser(data.user)
      // console.log(data)
      setToken(data.token);
    }).catch((err) => {
      const response = err.response;
      if (response && response === 422) {
        setMessage(response.data.message)
      }
    })
  }

  return (
    <div className="login-signup-form animated fadeInDown">

      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Enter password" />
          <button className="btn btn-block">Login</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
        </form>

      </div>
    </div>
  );
}
