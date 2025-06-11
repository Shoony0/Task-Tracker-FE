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
  return {};
}


export function clearSession(redirect_login: boolean) {
  sessionStorage.clear()
  if (redirect_login) {
    window.location.href = '/';
  }
}