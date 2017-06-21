import React from 'react';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStream, fetchStreams } from "../../actions";

import "./style.scss";

class StreamAddForm extends React.Component {
  constructor(props) {
    super(props);
  }

  // This function responsible for actually rendering the field JSX
  renderField(field) {
    return (
      <div className="field-container">
        <input
          className="text-field"
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    );
  }

  onSubmit(values) {
    this.props.createStream(values, () => {
      this.props.onExit();
      this.props.fetchStream();
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="stream-form-exit" onClick={this.props.onExit}>Cancel</div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Name"
            name="name"
            placeholder="Enter Name"
            component={this.renderField}
          />
          <div className="button-container">
            <button className="submit-button" type="submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "StreamAddForm"
})(
  connect(null, { createStream, fetchStreams })(StreamAddForm)
);
