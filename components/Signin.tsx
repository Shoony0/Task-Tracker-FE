"use client";
import React, { FormEvent } from 'react';
import { useLoginUser } from '@/api/auth';
import { useRouter } from 'next/navigation';
import "@/assets/signin.css";

const Signin = () => {

  const { loginUser, isPending } = useLoginUser();
  const router = useRouter();


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const loginData = Object.fromEntries(formData);
    loginUser(loginData, {
      onSuccess: ({ data }) => {
        sessionStorage.setItem('token', data.access);
        sessionStorage.setItem('refresh', data.refresh);
        window.location.href = '/projects'; // hard redirect to /project
      }
    });
  };

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
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" />
        Sign in with Google
      </button>

      <p className="footer-link">
        Need help? <a href="#">Contact Support</a>
      </p>
    </div>


  );
};

export default Signin;
