import styles from "./Header.module.css";
import trollFace from "../assets/images/TrollFace.png";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left_sec}>
        <img src={trollFace} alt="" />
        <h2>Meme Generator</h2>
      </div>
      <h3>By Rauch Rodrigues</h3>
    </header>
  );
}

export default Header;
