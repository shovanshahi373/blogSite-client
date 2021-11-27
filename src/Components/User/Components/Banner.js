import React, { useState, useEffect } from "react";

const Banner = ({ setImage, setImageBlog }) => {
  const [loading, setLoading] = useState(false);
  const mountFile = (e) => {
    console.log(e.target.files[0]);
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
    <section className="banner">
      {loading ? (
        <div className="banner-loading" />
      ) : (
        <input type="file" accept="image/*" onChange={mountFile} />
      )}
    </section>
  );
};

export default Banner;
