import React, { useState, useEffect } from 'react';

function CreateCommunity() {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userID'); // Fetch userId from local storage
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      alert('No user ID found in local storage!');
    }
  }, []);

  const handleCreateCommunity = async () => {
    if (!userId) {
      alert('User ID is required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, userId }), // Send userId as ownerId
      });
      if (response.ok) {
        alert('Community created successfully!');
        setName('');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Failed to create community: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating community:', error);
      alert('An error occurred while creating the community.');
    }
  };

  return (
    <div>
      <h2>Create Community</h2>
      <input
        type="text"
        placeholder="Community Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreateCommunity}>Create</button>
    </div>
  );
}

export default CreateCommunity;
