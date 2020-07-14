import React from "react";

const ProfileImage = ({ setProfile, setProfileBlob }) => {
  const mountFile = (e) => {
    setProfileBlob(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className='profile-image'>
      <div className='image-container'></div>
      <input type='file' accept='image/*' onChange={(e) => mountFile(e)} />
    </div>
  );
};

export default ProfileImage;
