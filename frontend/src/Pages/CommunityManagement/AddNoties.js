import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddNoties() {
    const [communityId, setCommunityId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedCommunityId = localStorage.getItem('selectedCommunityId');
        const storedUserId = localStorage.getItem('userID'); 
        if (storedCommunityId) {
            setCommunityId(storedCommunityId);
        } else {
            alert('No community ID found in local storage!');
        }
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            alert('No user ID found in local storage!');
        }
    }, []);

    const handleAddNotice = async () => {
        if (!communityId) {
            alert('Community ID is required!');
            return;
        }
        if (!userId) {
            alert('User ID is required!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/communities/${communityId}/notices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, userId }), // Include userId in the request body
            });

            if (response.ok) {
                alert('Notice added successfully!');
                setTitle('');
                setContent('');
                navigate(`/communityDetails/${communityId}`);
            } else if (response.status === 404) {
                alert('Community not found! Please check the community ID.');
            } else {
                alert('Failed to add notice.');
            }
        } catch (error) {
            console.error('Error adding notice:', error);
            alert('An error occurred while adding the notice.');
        }
    };

    return (
        <div>
            <h2>Add Notice to Community {communityId}</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleAddNotice}>Add Notice</button>
        </div>
    );
}

export default AddNoties;
