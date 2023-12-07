"use client"

import { useUserContext } from "@/modules/auth/UserContext";
import { useEffect, useRef } from 'react';

const Makanan = () => {
  const { authFetch } = useUserContext();
  const initialized = useRef(false);
  
  const getDaftarMakanan = async () => {
    const response = await authFetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/makanan/all', {
      method: 'GET',
    }
    );

    const data = await response.json();
    console.log(data);
    if (response.status == 200) {
      //TODO
    } else {

    }
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      getDaftarMakanan();
    }
  }, []);

  return (
    <div>
      <p></p>
    </div>
  );
};

export default Makanan;