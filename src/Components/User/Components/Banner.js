import React, { useState, useEffect } from "react";

const Banner = ({ setImage, setImageBlog }) => {
  const [loading, setLoading] = useState(false);
  const mountFile = (e) => {
    setImageBlog(e.target.files[0]);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setLoading(false);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <section className='banner'>
      {loading ? (
        <div className='banner-loading' />
      ) : (
        <input type='file' accept='image/*' onChange={(e) => mountFile(e)} />
      )}
    </section>
  );
};

export default Banner;
