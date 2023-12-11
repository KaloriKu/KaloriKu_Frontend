"use client"
import { useUserContext } from '@/modules/auth/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
    const { isAuthenticated } = useUserContext();
    const router = useRouter();

    useEffect(()=>{
        if (isAuthenticated) {
            localStorage.clear();
            window.location.reload();
        }
    }, [])

    return (<></>)
}