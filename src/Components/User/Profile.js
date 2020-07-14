import React, { useContext, useState, useEffect, useRef } from "react";
import ProfileStyle from "../../Styles/ProfileStyle";
import axios from "axios";

import { LoginContext } from "../../Contexts/loginContext";

//sub-components
import Banner from "./Components/Banner";
import ProfileImage from "./Components/ProfileImage";

const Profile = () => {
  const saveChangeButtonRef = useRef();
  const { userData, setUserData } = useContext(LoginContext);
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("");
  const [imageBlob, setImageBlog] = useState("");
  const [profileBlob, setProfileBlob] = useState("");

  useEffect(() => {
    console.log(userData);
    setImage(userData.backgroundImage);
    setProfile(userData.avatar);
  }, [userData]);

  useEffect(() => {
    if (image !== userData.backgroundImage || profile !== userData.avatar)
      saveChangeButtonRef.current.style.display = "inline-block";
    else saveChangeButtonRef.current.style.display = "none";
  }, [image, profile]);

  const handleChangedFields = () => {
    saveChangeButtonRef.current.classList.add("disabled");
    const token = "Bearer " + sessionStorage.getItem("TOKEN");
    const file = new FormData();
    file.append("cover", imageBlob, Date.now() + "B");
    file.append("profile", profileBlob, Date.now() + "P");
    for (let pair of file.entries()) {
      console.log(pair[0], pair[1]);
    }

    axios
      .post("http://localhost:5000/users/upload", file, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        saveChangeButtonRef.current.classList.remove("disabled");
        saveChangeButtonRef.current.style.display = "none";
      });
  };

  return (
    <ProfileStyle cover={image} profile={profile}>
      {/* // <ProfileStyle cover={userData.backgroundImage} profile={userData.avatar}> */}
      <Banner setImage={setImage} setImageBlog={setImageBlog} />
      <section className='info-section'>
        <ProfileImage setProfile={setProfile} setProfileBlob={setProfileBlob} />
        <ul className='social-media-links'>
          <li>
            <i className='fab fa-facebook'></i>
          </li>
          <li>
            <i className='fab fa-instagram'></i>
          </li>
          <li>
            <i className='fab fa-twitter'></i>
          </li>
          <li>
            <i className='fab fa-reddit'></i>
          </li>
        </ul>
      </section>
      <section className='description'>
        <span>blogs written: {userData.blogCount}</span>
        <span>total likes: {"12K"}</span>
      </section>
      <main></main>
      <button
        ref={saveChangeButtonRef}
        className='save-changes'
        onClick={handleChangedFields}
      >
        save changes
        <i className='far fa-check-circle' />
      </button>
    </ProfileStyle>
  );
};

export default Profile;
