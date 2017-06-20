import React from "react";
import EntryAddPlus from "../Entry_Add_Plus";
import EntryAddForm from "../Entry_Add_Form";

// EntryAdd renders the Entry_Add_Plus or Entry_Add_Form depending on formVisible state
class EntryAdd extends React.Component {
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
      <EntryAddForm onExit={this.handleExitForm}/>
    : <EntryAddPlus onClick={this.handleClick}/>;

    return (
      <div>
        {display}
      </div>
    );
  }
}

export default EntryAdd;
