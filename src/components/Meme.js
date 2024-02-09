import React, { useEffect, useState } from "react";
import styles from "./Meme.module.css";

function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    textColor: "",
    meme: "",
  });

  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setMemes(data.data.memes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getRandomMemeImagesHandler(e) {
    e.preventDefault();

    const randomIndex = Math.floor(Math.random() * memes.length);
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        meme: memes[randomIndex],
      };
    });

    console.log(meme);
  }

  function memeTextHandler(e) {
    const { name, value } = e.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  return (
    <main className={styles.meme_container}>
      <form className={styles.form} onSubmit={getRandomMemeImagesHandler}>
        <input
          type="text"
          placeholder="Top Text"
          className={styles.form_input}
          name="topText"
          onChange={memeTextHandler}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          className={styles.form_input}
          name="bottomText"
          onChange={memeTextHandler}
        />
        <input
          type="color"
          name="textColor"
          id="textColor"
          onChange={memeTextHandler}
        />
        <label htmlFor="textColor">Choose Text Color</label>
        <button className={styles.meme_button}>Get a new meme images</button>
      </form>

      {meme.meme !== "" && (
        <div className={styles.meme} key={meme.meme.id}>
          <img
            src={meme.meme.url}
            alt={meme.meme.name}
            key={meme.meme.id}
            className={styles.meme_image}
          />
          <h1 style={{ color: meme.textColor }} className={styles.top_text}>
            {meme.topText}
          </h1>
          <h1 style={{ color: meme.textColor }} className={styles.bottom_text}>
            {meme.bottomText}
          </h1>
        </div>
      )}
    </main>
  );
}

export default Meme;
