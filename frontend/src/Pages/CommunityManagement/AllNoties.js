import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AllNoties() {
  const { communityId } = useParams();
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/${communityId}/notices`);
        if (response.ok) {
          const data = await response.json();
          setNotices(data);
        } else {
          alert('Failed to fetch notices.');
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
    fetchNotices();
  }, [communityId]);

  return (
    <div>
      <h2>Notices for Community {communityId}</h2>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <div key={notice.id} className="notice-card">
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
          </div>
        ))
      ) : (
        <p>No notices available.</p>
      )}
    </div>
  );
}

export default AllNoties;
