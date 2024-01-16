import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import DataTable from './data';
const apiUrl = process.env.REACT_APP_API_URL;
const Inbox = () => {
  const [emails, setEmailData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl}/get-emails`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'User-Email': localStorage.getItem('userEmail'),  // Pastikan email pengguna disertakan
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setEmailData(data);
        } else {
          console.error('Error fetching emails:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };
  
    fetchData();
  }, []); 

  return (
    <div>
      <Navbar />
      <h2>Inbox</h2>
      <DataTable data={emails} />
    </div>
  );
};

export default Inbox;
