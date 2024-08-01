import { Component } from "react";
import "./App.css";
import "tachyons";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = { ...initialState };
  }

  componentDidMount() {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then(console.log)
      .catch((e) => {
        console.log(e);
      });
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        entries: user.entries,
        joined: user.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.data;
    const image = document.querySelector("#inputimage");
    const { width, height } = image;

    const faceData = clarifaiFace?.map((item) => {
      const data = item.region_info.bounding_box;
      return {
        leftCol: data.left_col * width,
        topRow: data.top_row * height,
        rightCol: width - data.right_col * width,
        bottomRow: height - data.bottom_row * height,
      };
    });

    return faceData;
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = (event) => {
    this.setState(
      {
        imageUrl: this.state.input,
      },
      () => {
        this.returnClarifaiResult(this.state.imageUrl);
        console.log(this.state);
      }
    );
    event.target.parentNode.children[0].value = "";
  };

  returnClarifaiResult = (imageUrl) => {
    fetch("http://localhost:3000/imageUrl", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status.code === 10000) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: this.state.user.id }),
          })
            .then((res) => res.json())
            .then((count) => {
              this.setState(
                { user: Object.assign(this.state.user, { entries: count }) },
                console.log
              );
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };

  render() {
    const { isSignedIn, route, boxes, imageUrl } = this.state;
    return (
      <div>
        <ParticlesBg color="#ffffff" num={100} type="cobweb" bg={true} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        <Logo />
        {route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition boxes={boxes} imgUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <div>
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        ) : (
          <div>
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
