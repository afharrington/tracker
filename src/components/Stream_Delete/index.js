import React from "react";

import "./style.scss";

class StreamDelete extends React.Component {
  
  render() {
    return (
      <div className="stream-delete" onClick={this.props.onClick}>
        <div>Delete Stream</div>
      </div>
    );
  }
}

export default StreamDelete;
