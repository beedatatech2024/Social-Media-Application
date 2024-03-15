import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FollowersList = ({ username= "Beedata_" }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          `https://api.twitter.com/2/followers/list.json?screen_name=${username}`,
          {
            headers: {
              Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAALv%2FsgEAAAAA4XxkdC8XgeSmJzoXJjT6kYPOHEk%3DyOPjndxFXeLywYRdCXAYgNwzkGfmd8xLjs4U03T06o06vMd28M`, // Replace with your OAuth 2.0 Bearer Token
            },
          }
        );
        setFollowers(response.data.users);
      } catch (error) {
        console.error('Error fetching followers:', error);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div>
      <h2>Followers of {username}</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>{follower.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
