import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

const Axios2: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from ipinfo.io API using axios
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ipinfo.io/161.185.160.93/geo'); // Make GET request
        console.log(response.data); // Check the response in the console
        setData(response.data);     // Set the fetched data
      } catch (error: any) {
        console.error('Error fetching data:', error);
        setError(error.message); // Handle any errors
      } finally {
        setLoading(false); // Stop loading in both success and error cases
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>IP Info</h1>
      <p><strong>IP:</strong> {data?.ip}</p>
      <p><strong>City:</strong> {data?.city}</p>
      <p><strong>Region:</strong> {data?.region}</p>
      <p><strong>Country:</strong> {data?.country}</p>
    </div>
  );
};

export default Axios2;
