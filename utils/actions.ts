import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

type tokenDataType = {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
};

export function getAccessJWTTokenData(): tokenDataType {
  const token = sessionStorage.getItem('token');

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
    user_id: 0
  };
}


export function clearSession(redirect_login: boolean) {
  sessionStorage.clear()
  if (redirect_login) {
    window.location.href = '/';
  }
}

export function getErrorMessage(error: AxiosError) {
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