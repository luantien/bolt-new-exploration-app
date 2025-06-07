import React, { useEffect, useState } from 'react';

function Home() {
  const [backendStatus, setBackendStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001')
      .then(res => res.text())
      .then(data => setBackendStatus(data))
      .catch(() => setBackendStatus('Backend not connected'));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>Frontend is running</p>
      <p>Backend status: {backendStatus}</p>
    </div>
  );
}

export default Home;