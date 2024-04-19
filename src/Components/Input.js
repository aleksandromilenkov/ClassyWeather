import React from "react";
class Input extends React.Component {
  render() {
    return (
      <input
        type="text"
        placeholder="Search for location..."
        value={this.props.location}
        onChange={this.props.onChangeLocation}
      />
    );
  }
}
export default Input;
