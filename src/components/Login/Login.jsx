import React, { useState } from 'react';
import { useUser } from '../../UserContext/UserProvider';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate() 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/ventas')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </main>
  );
};

export default Login;
