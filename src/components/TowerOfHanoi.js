import React from "react";

const server = "http://127.0.0.1:8080";

class TowerOfHanoi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ping: false, pollingCount: 0, delay: 500 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
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
          spireOne: json["0"],
          spireTwo: json["1"],
          spireThree: json["2"],
          playerId: json.playerId,
          selectedSpire: 0,
          targetSpire: 1,
        });
      });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, this.state.delay);
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
          spireOne: json["0"],
          spireTwo: json["1"],
          spireThree: json["2"],
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

    console.log(json);
    this.setState({
      spireOne: json["0"],
      spireTwo: json["1"],
      spireThree: json["2"],
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
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
          <p>targetSpire : {this.state.targetSpire}</p>
          <p>pollingCount: {this.state.pollingCount}</p>
        </div>
        <div>
          <button type="button" onClick={() => this.move("up")}>
            Move Block on Selected Spire to Target Spire
          </button>

          <form onSubmit={this.handleSubmit}>
            <label>
              Pick your favorite flavor:
              <select value={this.state.value} onChange={this.handleChange}>
                {" "}
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default TowerOfHanoi;
