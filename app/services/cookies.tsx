export function getCookie(key: string): string {
  const cookieString = `; ${document.cookie}`;
  const match = cookieString.match(new RegExp(`; ${key}=([^;]+)`));
  return match ? match[1] : null;
}

export function setCookie(key: string, value: string): void {
  const newCookie = `${key}=${value};path=/`;
  document.cookie = newCookie;
}
