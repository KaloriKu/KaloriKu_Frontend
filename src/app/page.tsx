'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Home() {
  const initialized = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      router.push('/dashboard');
    }
  }, []);
}
