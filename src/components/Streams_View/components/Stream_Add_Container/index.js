import React from "react";
import StreamAddPlus from "./components/Stream_Add_Form";
import StreamAddFormHidden from "./components/Stream_Add_Form_Hidden";
import "./style.scss";

class StreamAddContainer extends React.Component {
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

export default StreamAddContainer;
