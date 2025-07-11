"use client"
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

type tokenDataType = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  short_name: string;
  user_id: number;
  roles: string[];
};

export function getAccessJWTTokenData(): tokenDataType {
  /**
   * Utility to decode the access JWT token from localStorage.
   * 
   * @returns Decoded token data if token exists, otherwise default empty values.
   */
  const token = localStorage.getItem('token');

  if (token) {
    const decodedTokenData: tokenDataType = jwtDecode(token);
    console.log(decodedTokenData);
    return decodedTokenData
  }
  return {
    token_type: '',
    exp: 0,
    iat: 0,
    jti: '',
    user_id: 0,
    short_name: 'T U',
    roles: [],
  };
}


export function clearSession(redirect_login: boolean) {
  /**
   * Clears session storage and optionally redirects to login page.
   * 
   * @param redirectLogin - If true, redirects to login page after clearing session.
   */
  
  localStorage.clear()
  if (redirect_login) {
    // Redirect to login route
    window.location.href = '/';
  }
}

export function getErrorMessage(error: AxiosError) {
  /**
   * Extracts a user-friendly error message from an AxiosError response.
   * 
   * @param error - The AxiosError object.
   * @returns Extracted error message string.
   */
  const data = (error as any)?.response?.data;

  // if any other error comes
  if (data?.detail) {
    return data?.detail;
  }

  if (data && typeof data === 'object') {
    const firstKey = Object.keys(data)[0];
    return (data as Record<string, string[]>)[firstKey]?.[0] ?? 'Something went wrong';
  }
  return 'Something went wrong';
}