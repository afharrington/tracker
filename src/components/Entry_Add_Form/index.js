import React from 'react';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createEntry } from "../../actions";

import { fetchEntries } from "../../actions";

import "./style.scss";

class EntryAddForm extends React.Component {
  constructor(props) {
    super(props);

  }

  // This function responsible for actually rendering the JSX
  renderField(field) {
    return (
      <div className="entry-add-form">
        <label>{field.label}</label>
        <input type="text" {...field.input} />
      </div>
    );
  }

  onSubmit(values) {
    console.log("props:", this.props);
    this.props.createEntry(values, () => {
      this.props.onExit();
      this.props.fetchEntries();
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="exit" onClick={this.props.onExit}>X</div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Details"
            name="content"
            component={this.renderField}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "EntryAddForm"
})(
  connect(null, { createEntry, fetchEntries })(EntryAddForm)
);
