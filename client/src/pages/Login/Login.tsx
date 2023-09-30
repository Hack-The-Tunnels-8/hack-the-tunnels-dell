import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components";
import { useAccountContext } from "../../context";
import "./Login.style.scss";

function Login() {
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { loggedIn, login } = useAccountContext();
  const navigate = useNavigate();

  const attemptLogin = async () => {
    try {
      const message = await login(email, password);
      setMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedIn() === true) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <Page>
      <div className="login-page">
        <h1 className="adaptive">Login</h1>
        <input type="text" placeholder="johndoe@email.com" onChange={(event) => {setEmail(event.target.value)}} />
        <input type="text" placeholder="password123" onChange={(event) => {setPassword(event.target.value)}} />
        <div>
          <button onClick={() => attemptLogin()}>
            Login
          </button>
        </div>
        <div>
          <p className="response">{message && <p>{message}</p>}</p>
        </div>
      </div>
    </Page>
  );
}

export default Login;
