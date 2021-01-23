import React from "react";

const server = "http://127.0.0.1:8080";

class TowerOfHanoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ping: false };
  }

  move(direction) {
    (async () => {
      const rawResponse = await fetch(`${server}/api/move`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedSpire: this.state.selectedSpire,
          direction,
          playerId: this.state.playerId,
        }),
      });
      const content = await rawResponse.json();

      console.log(content);
    })();
  }

  componentWillMount() {
    fetch(`${server}/api/gameState`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({
          ping: true,
          spireOne: json.spireOne,
          spireTwo: json.spireTwo,
          spireThree: json.spireThree,
          playerId: 0,
          selectedSpire: 1,
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
          <p>playerId : {this.state.playerId}</p>
          <p>selectedSpire : {this.state.selectedSpire}</p>
        </div>
        <div>
          {" "}
          <button type="button" onClick={() => this.move("up")}>
            Move Block Up
          </button>
        </div>
      </div>
    );
  }
}

export default TowerOfHanoi;
