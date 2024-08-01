import "./FaceRecognition.css";

const FaceBox = ({ top, left, bottom, right }) => {
  return (
    <div
      className="bounding-box"
      style={{
        top,
        left,
        bottom,
        right,
      }}
    ></div>
  );
};

export default FaceBox;
