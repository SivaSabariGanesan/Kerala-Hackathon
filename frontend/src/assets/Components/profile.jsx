import React from 'react';

const Profile = ({ user }) => {
  if (!user) {
    return <div className="text-center mt-20">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="mt-4">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.picture && (
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-full mt-4 w-24 h-24"
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
