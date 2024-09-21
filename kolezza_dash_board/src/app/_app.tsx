import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next'; 
import type { AppProps } from 'next/app';
import '../globals.css'; 

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const token = getCookie('token');

    if (!token && router.pathname !== '/login') {
      
      router.push('/login');
    } else {
      setLoading(false); 
    }
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return <Component {...pageProps} />;
}

export default MyApp;
