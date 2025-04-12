import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function MyCommunity() {
    const [communities, setCommunities] = useState([]);
    const userId = localStorage.getItem('userID');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchMyCommunities = async () => {
            try {
                const response = await fetch(`http://localhost:8080/communities/myCommunities/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCommunities(data);
                } else {
                    alert('Failed to fetch communities.');
                }
            } catch (error) {
                console.error('Error fetching communities:', error);
            }
        };

        fetchMyCommunities();
    }, [userId]);

    const handleLeaveCommunity = async (communityId) => {
        const confirmLeave = window.confirm("Are you sure you want to leave this community?");
        if (!confirmLeave) return;

        try {
            const response = await fetch(`http://localhost:8080/communities/${communityId}/removeUser`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                setCommunities((prevCommunities) =>
                    prevCommunities.filter((community) => community.id !== communityId)
                );
                alert("You have left the community successfully.");
            } else {
                const errorData = await response.json();
                alert(errorData.error || "Failed to leave the community.");
            }
        } catch (error) {
            console.error("Error leaving community:", error);
            alert("Network error while leaving the community.");
        }
    };

    return (
        <div>
            <h2>All Communities</h2>
            <button onClick={() => (window.location.href = '/createCommunity')}>Add Com</button>
            {communities.length > 0 ? (
                communities.map((community) => (
                    <div key={community.id} className="community-card">
                        <h3>{community.name}</h3>
                        <button onClick={() => navigate(`/communityDetails/${community.id}`)}>
                            View Community
                        </button>
                        <button onClick={() => handleLeaveCommunity(community.id)}>Leave</button>
                    </div>
                ))
            ) : (
                <p>No communities available.</p>
            )}
        </div>
    );
}

export default MyCommunity;
