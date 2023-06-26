import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form>
          <h1 className="title">
            Create a free account
          </h1>
          <input type="text" placeholder="Enter full name" />
          <input type="email" placeholder="Enter email address" />
          <input type="password" placeholder="Enter password" />
          <button className="btn btn-block">Submit</button>
          <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  )
}
