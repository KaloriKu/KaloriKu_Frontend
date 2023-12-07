"use client"

import { useState } from 'react';
import { useUserContext } from '@/modules/auth/UserContext';

const Login = () => {
  const { login } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // TODO: Check field valid or not
    login({
      "username": email,
      "password": password
    })
  };

  return (
    <div style={{'padding': '80px'}}>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input style={{"color": "black"}} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input style={{"color": "black"}} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;