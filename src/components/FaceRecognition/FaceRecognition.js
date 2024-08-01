import BoundingBox from "./BoundingBox";

const FaceRecognition = ({ imgUrl, boxes }) => {
  const boxArr =
    boxes?.length !== undefined
      ? boxes.map((box, i) => {
          return (
            <BoundingBox
              key={i}
              top={box.topRow}
              right={box.rightCol}
              bottom={box.bottomRow}
              left={box.leftCol}
            />
          );
        })
      : null;

  return (
    <div className="tc pa2">
      <div
        className="center"
        style={{
          position: "relative",
          maxWidth: "800px",
        }}
      >
        <img src={imgUrl} alt="" className="shadow-5 br2" id="inputimage" />
        <div>{boxArr}</div>
      </div>
    </div>
  );
};

export default FaceRecognition;
