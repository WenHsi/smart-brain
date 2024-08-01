import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div className="">
      <p className="f3 tc">
        {`This Magic Brain will detect faces in your pictures. Git it a try.`}
      </p>
      <div className="ma2">
        <div className="form center pa4 shadow-5 br3 flex-column flex-row-ns">
          <input
            onChange={onInputChange}
            className="f4 w-100 b--solid b--black-05 bw1 pv1"
            type="text"
          />
          <button
            onClick={onPictureSubmit}
            className="f4 ma2 mb0 ma0-m ma0-l self-center grow b--solid ba w-40 w-30-m w-30-l br1 link oh3 pv2 dib white bg-light-purple b--white"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
