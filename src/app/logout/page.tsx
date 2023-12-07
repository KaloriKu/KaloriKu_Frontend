"use client"
import { useUserContext } from '@/modules/auth/UserContext';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const { isAuthenticated } = useUserContext();
    const router = useRouter();
    if (isAuthenticated) {
        localStorage.clear();
        router.push('/')
    }

    return (<></>)
}