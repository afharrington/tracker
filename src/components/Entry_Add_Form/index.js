import React from 'react';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createEntry, fetchEntries } from "../../actions";

import "./style.scss";

class EntryAddForm extends React.Component {
  constructor(props) {
    super(props);
  }

  // This function responsible for actually rendering the field JSX
  renderTextField(field) {
    return (
      <div className="field-container">
        <textarea
          className={field.styleclass}
          type="text"
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    );
  }

  renderNumberField(field) {
    return (
      <div className="field-container">
        <input
          className={field.styleclass}
          type="number"
          min={field.min}
          max={field.max}
          placeholder={field.placeholder}
          {...field.input}
        />
      </div>
    )
  }

  renderNumbersField(field) {
    return (
      <div className="field-container">
        <input
          className={field.styleclass}
          type="number"
          min={field.min}
          max={field.max}
          {...field.input}
        />
        <label>{field.label}</label>
      </div>
    )
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
      <div className="entry-add-form">
        <div className="entry-exit" onClick={this.props.onExit}>x</div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Details"
            name="content"
            placeholder="Enter Details"
            styleclass="details"
            component={this.renderTextField}
          />
          <Field
            label="Hrs"
            name="hours"
            styleclass="hours"
            component={this.renderNumbersField}
            min="0"
            max="23"
          />
          <Field
            label="Min"
            name="minutes"
            styleclass="min"
            component={this.renderNumbersField}
            min="0"
            max="59"
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
  form: "EntryAddForm"
})(
  connect(null, { createEntry, fetchEntries })(EntryAddForm)
);
