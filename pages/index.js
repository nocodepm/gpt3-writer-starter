import { useEffect } from 'react';
import { useRouter } from 'next/router';

function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home.html');
  }, []);

  return null;
}

export default IndexPage;