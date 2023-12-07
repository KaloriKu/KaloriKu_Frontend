"use client"

import { useState } from 'react';
import { useUserContext } from '@/modules/auth/UserContext';

const Register = () => {
  const { register } = useUserContext();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // TODO: Check field valid or not
    register({
      "email": email,
      "password": password,
      "nama": nama
    })
  };

  return (
    <div style={{'padding': '80px'}}>
      <h1>Register</h1>
      <form>
        <label>
          Nama:
          <input style={{"color": "black"}} type="nama" value={nama} onChange={(e) => setNama(e.target.value)} />
        </label>
        <br />
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;