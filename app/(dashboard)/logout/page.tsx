'use client';
import { clearSession } from '@/utils/actions';
import { useEffect } from 'react';

export default function LogoutPage() {

  useEffect(() => {
    clearSession(true);
  }, []);

  return <p>Logging out...</p>;
}