'use client';
import Loader from '@/components/Loader';
import { clearSession } from '@/utils/actions';
import { useEffect } from 'react';

export default function LogoutPage() {

  // useEffect runs once on component mount
  useEffect(() => {
    // Clear session and redirect to login
    clearSession(true);
  }, []);

  // Show loader while logout process happens
  return <Loader message='Logging out...' />
}