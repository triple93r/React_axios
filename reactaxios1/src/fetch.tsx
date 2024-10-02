import React, { useEffect, useState } from 'react';

const Fetchs: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from ipinfo.io API
    const fetchData = () => {
      fetch('https://ipinfo.io/161.185.160.93/geo') // You can append API key if required
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Check the response in the console
          setData(data);
          setLoading(false); // Stop loading once data is fetched
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError(error.message);
          setLoading(false); // Stop loading in case of an error
        });
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>IP Info Fetchs</h1>
      <p><strong>IP:</strong> {data?.ip}</p>
      <p><strong>City:</strong> {data?.city}</p>
      <p><strong>Region:</strong> {data?.region}</p>
      <p><strong>Country:</strong> {data?.country}</p>
    </div>
  );
};

export default Fetchs;
