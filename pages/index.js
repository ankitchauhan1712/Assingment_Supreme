// pages/index.js
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  console.log('session:', session);

  const handleSignOut = () => {
    // Navigate to the signup page
    router.push('/signup');
  };

  return (
    <div>    
        <>
          <h1>Welcome to the Next.js Apps</h1>
          <button onClick={() => signIn()}>Sign in</button>
        </>
     
             <>
   
             <button onClick={handleSignOut}>Signup</button>
        </>
    
    </div>
  );
}
