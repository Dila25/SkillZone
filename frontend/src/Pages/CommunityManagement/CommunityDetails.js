import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CommunityDetails() {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [users, setUsers] = useState([]);
  const [ownerId, setOwnerId] = useState(null);

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

  useEffect(() => {
    const fetchCommunityUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/${communityId}/users`);
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          alert('Failed to fetch community users.');
        }
      } catch (error) {
        console.error('Error fetching community users:', error);
      }
    };
    fetchCommunityUsers();
  }, [communityId]);

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/communities/${communityId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Community Details:', data);
          // Check for ownerId in the response
          if (data.ownerId !== undefined) {
            setOwnerId(data.ownerId);
          } else {
            console.error('Owner ID is missing in the response:', data);
          }
        } else {
          console.error('Failed to fetch community details. Status:', response.status);
          alert('Failed to fetch community details.');
        }
      } catch (error) {
        console.error('Error fetching community details:', error);
      }
    };
    fetchCommunityDetails();
  }, [communityId]);

  const userId = localStorage.getItem('userID');

  const handleDeleteNotice = async (noticeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(
        `http://localhost:8080/communities/${communityId}/notices/${noticeId}`,
        { method: "DELETE" }
      );
  
      if (response.ok) {
        setNotices((prevNotices) => prevNotices.filter((notice) => notice.id !== noticeId));
        alert("Notice deleted successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete the notice.");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("Network error while deleting the notice.");
    }
  };

  const handleUpdateNotice = async (noticeId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/communities/notices/${noticeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        const updatedNotice = await response.json();
        setNotices((prevNotices) =>
          prevNotices.map((notice) =>
            notice.id === noticeId ? { ...notice, ...updatedNotice } : notice
          )
        );
        alert("Notice updated successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to update the notice.");
      }
    } catch (error) {
      console.error("Error updating notice:", error);
      alert("Network error while updating the notice.");
    }
  };

  return (
    <div>
      <h2>Community Details</h2>
      <p>Community ID: {communityId}</p>
      {userId && ownerId && userId === ownerId ? (
        <>
          <button
            onClick={() => {
              localStorage.setItem('selectedCommunityId', communityId);
              navigate(`/addNoties/${communityId}`);
            }}
          >
            Add Notice
          </button>
          <button
            onClick={() => {
              localStorage.setItem('selectedCommunityId', communityId);
              navigate(`/communityUsers/${communityId}`);
            }}
          >
            Users
          </button>
        </>
      ) : ownerId === null ? (
        <p>Loading community details...</p>
      ) : (
        <p>You do not have permission to manage this community.</p>
      )}

      <h3>Notices</h3>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <div key={notice.id} className="notice-card">
            <h4>{notice.title}</h4>
            <p>{notice.content}</p>
            {userId && ownerId && userId === ownerId && (
              <>
                <button onClick={() => handleDeleteNotice(notice.id)}>Delete Notice</button>
                <button onClick={() => navigate(`/updateNoties/${notice.id}`)}>Update Notice</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No notices available.</p>
      )}

      <h3>Users</h3>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} >
            <p>{user.fullname}</p>
          </div>
        ))
      ) : (
        <p>No users in this community.</p>
      )}
    </div>
  );
}

export default CommunityDetails;
