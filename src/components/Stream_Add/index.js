import React from "react";
import StreamAddPlus from "../Stream_Add_Plus";
import StreamAddForm from "../Stream_Add_Form";
import "./style.scss";

class StreamAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formVisible: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleExitForm = this.handleExitForm.bind(this);
  }

  handleClick(e) {
    this.setState({ formVisible: true} );
  }

  // Passes down this event handler for use in the form's X icon
  handleExitForm(e) {
    this.setState( {formVisible: false} );
  }

  render() {
    let display = this.state.formVisible ?
      <StreamAddForm onExit={this.handleExitForm}/>
    : <StreamAddPlus onClick={this.handleClick}/>;

    return (
      <div className="stream-add-container">
        {display}
      </div>
    );
  }
}

export default StreamAdd;
