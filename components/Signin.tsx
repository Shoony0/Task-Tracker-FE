"use client";
import React, { FormEvent } from 'react';
import { useLoginUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import "@/assets/signin.css";
import Image from 'next/image'
import { JWTToken, LoginFormData } from '@/utils/types';


const Signin = () => {

  const { loginUser, isPending } = useLoginUser();
  const router = useRouter();


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
     /**
     * Handles form submission for normal login.
     * Converts form data to object and triggers login mutation.
     */
    e.preventDefault();
     // Extract form data
    const formData = new FormData(e.currentTarget);
    const loginData  = Object.fromEntries(formData) as LoginFormData;
    
    // Call login mutation
    loginUser(loginData, {
      onSuccess: ({ data }: { data: JWTToken }) => {
        // Store tokens in localStorage
        localStorage.setItem('token', data.access);
        localStorage.setItem('refresh', data.refresh);
        window.location.href = '/projects'; // hard redirect to /project
      }
    });
  };

  // Handles SSO login by redirecting user to Google login endpoint.
  const handleSSO = () => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}api/auth/google/login/`);
  };

  return (

    <div className="signin-container">
      <h1>Sign In to Task Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit" disabled={isPending}>{isPending ? 'Logging in...' : 'Sign In'}</button>
      </form>

      <button className="google-btn" onClick={handleSSO}>
        <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" width={24} height={24} />
        Sign in with Google
      </button>

      <p className="footer-link">
        Need help? <a href="#">Contact Support</a>
      </p>
    </div>


  );
};

export default Signin;
