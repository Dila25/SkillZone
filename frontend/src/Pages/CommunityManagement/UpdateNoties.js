import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateNoties() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/notices/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
        } else {
          alert('Failed to fetch notice details.');
        }
      } catch (error) {
        console.error('Error fetching notice details:', error);
      }
    };

    fetchNoticeDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/communities/notices/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert('Notice updated successfully.');
        navigate(-1); 
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update the notice.');
      }
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Network error while updating the notice.');
    }
  };

  return (
    <div>
      <h2>Update Notice</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateNoties;
