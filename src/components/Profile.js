import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Profile() {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user details for ID ${userId}`);
        }
        const userData = await response.json();
        setUserDetails(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [userId]);


  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container text-center items-center ">
      <h1 className='text-4xl font-bold text-black bg-slate-400 text-center m-5 p-3'>Profile</h1>
      <h1 className='text-2xl font-semibold'>Welcome, {userDetails.firstName} {userDetails.lastName}!</h1>
      <p className='text-2xl font-semibold'>Username: {userDetails.username}</p>
      <p className='text-2xl font-semibold'>Email: {userDetails.email}</p>
      <p className='text-2xl font-semibold'>Gender: {userDetails.gender}</p>
      <center>
      <img src={userDetails.image} alt="User profile" />
      </center>
      {/* Logout button */}
      <button className="btn mt-4 font-semibold text-xl bg-red-500 text-white" onClick={()=>navigate('/')}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
