import React from "react";

class SelectSpireForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: props.selectedSpire };
  }

  handleChange(event) {
    this.props.handler(event.target.value);
    event.preventDefault();
  }

  render() {
    return (
      <form>
        <label>
          {this.props.text}
          <select value={this.props.value} onChange={this.handleChange}>
            selectedSpire
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </label>
      </form>
    );
  }
}

export default SelectSpireForm;
