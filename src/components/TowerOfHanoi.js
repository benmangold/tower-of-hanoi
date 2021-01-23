import React from "react";

const server = "http://127.0.0.1:8080";

function spireOneLeft() {
  (async () => {
    const rawResponse = await fetch(`${server}/api/spireOne/left`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ a: 1, b: "Textual content" }),
    });
    const content = await rawResponse.json();

    console.log(content);
  })();
}

class TowerOfHanoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { spireOne: [], spireTwo: [], spireThree: [] };
  }

  componentDidMount() {
    fetch(`${server}/api/gameState`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({
          spireOne: json.spireOne,
          spireTwo: json.spireTwo,
          spireThree: json.spireThree,
        });
      });
  }
  render() {
    return (
      <div>
        <div>
          <p>
            <b>Game State</b>
          </p>
          <p>spireOne : {this.state.spireOne}</p>
          <p>spireTwo : {this.state.spireTwo}</p>
          <p>spireThree : {this.state.spireThree}</p>
        </div>
        <div>
          {" "}
          <button type="button" onClick={spireOneLeft}>
            Click Me
          </button>
        </div>
      </div>
    );
  }
}
export default TowerOfHanoi;
