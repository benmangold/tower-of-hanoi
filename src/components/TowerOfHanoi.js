import React from "react";

import SelectSpireForm from "./SelectedSpireForm.js";

const server = "http://127.0.0.1:8080";

class TowerOfHanoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ping: false,
      pollingCount: 0,
      delay: 500,
      victory: false,
      debug: false,
    };

    this.move = this.move.bind(this);
    this.selectSpireHandler = this.selectSpireHandler.bind(this);
    this.targetSpireHandler = this.targetSpireHandler.bind(this);
  }

  // componentWillMount() {
  //   fetch(`${server}/api/initState`, {
  //     method: "GET",
  //   })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((json) => {
  //     console.log(json);
  //     this.setState({
  //       ping: true,
  //       spireZero: json["0"],
  //       spireOne: json["1"],
  //       spireTwo: json["2"],
  //         playerId: json.playerId,
  //         selectedSpire: 0,
  //         targetSpire: 0,
  //       });
  //     });
  //   }

  componentDidMount() {
    this.interval = setInterval(this.tick, this.state.delay);
    fetch(`${server}/api/initState`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        this.setState({
          ping: true,
          spireZero: json["0"],
          spireOne: json["1"],
          spireTwo: json["2"],
          playerId: json.playerId,
          selectedSpire: 0,
          targetSpire: 0,
        });
      });
  }

  tick = async () => {
    await fetch(`${server}/api/gameState`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          spireZero: json["0"],
          spireOne: json["1"],
          spireTwo: json["2"],
        });
      });

    this.setState({
      pollingCount: this.state.pollingCount + 1,
    });
  };
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async move() {
    const rawResponse = await fetch(`${server}/api/move`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedSpire: this.state.selectedSpire,
        targetSpire: this.state.targetSpire,
        playerId: this.state.playerId,
      }),
    });
    const json = await rawResponse.json();
    if (json.error) {
      alert(json.error);
    }
    console.log(json);
    this.setState({
      spireZero: json["0"],
      spireOne: json["1"],
      spireTwo: json["2"],
    });
  }

  selectSpireHandler(spireId) {
    this.setState({
      selectedSpire: spireId,
    });
  }

  targetSpireHandler(spireId) {
    this.setState({ targetSpire: spireId });
  }

  render() {
    return (
      <div>
        {this.state.ping == false ? <image src="{server}/spinner.gif" /> : null}
        {this.state.debug ? <DebugMenu state={this.state} /> : null}
        <Game state={this.state} />
        <MoveMenu
          state={this.state}
          move={this.move}
          selectSpireHandler={this.selectSpireHandler}
          targetSpireHandler={this.targetSpireHandler}
        />
      </div>
    );
  }
}

export default TowerOfHanoi;

const MoveMenu = (props) => {
  return (
    <div>
      <SelectSpireForm
        handler={props.selectSpireHandler}
        selectedSpire={props.state.selectedSpire}
      />

      <SelectSpireForm
        handler={props.targetSpireHandler}
        selectedSpire={props.state.selectedSpire}
      />
      <button type="button" onClick={props.move}>
        ~
      </button>
    </div>
  );
};

const DebugMenu = ({ state }) => {
  return (
    <div>
      <div>
        <p>
          <b>Game State</b>
        </p>
        <p>spireZero : {state.spireZero}</p>
        <p>spireOne : {state.spireOne}</p>
        <p>spireTwo : {state.spireTwo}</p>
        <p>playerId : {state.playerId}</p>
        <p>pollingCount: {state.pollingCount}</p>
      </div>
    </div>
  );
};

const Game = ({ state }) => {
  return (
    <div>
      <div>
        <p>{state.spireZero}</p>
        <p>~~~~~~~~~~~~~~~~~~~</p>
        <p>{state.spireOne}</p>
        <p>~~~~~~~~~~~~~~~~~~~</p>
        <p>~~~~~~~~~~~~~~~~~~~</p>
        <p>{state.spireTwo}</p>
      </div>
    </div>
  );
};
