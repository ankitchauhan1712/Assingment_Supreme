// pages/dashboard.js
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/users");
      console.log("11===",res)
      const data = await res.json();
      setUsers(data);
    }

    fetchData();
  }, []);

  const handleSignOut = () => {  

    // Navigate to the signup page
    router.push('/');
  };
  return (
    <div>
      <h1>User Dashboard</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.email}</li>
          
        ))}
         <button onClick={() => handleSignOut()}>Sign out</button>
      </ul>
    </div>
  );
}

