import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from "./brain.png";

const Logo = () => {
  return (
    <div className="ma4 mt0 dib">
      <Tilt>
        <div
          className="Tilt shadow-2 br2 flex"
          style={{
            height: "150px",
            width: "150px",
          }}
        >
          <img src={brain} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
