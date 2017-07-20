// EntryAddForm uses redux-form to manage form state in Redux
import React from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createEntry, fetchEntries } from "../../../../../../actions";
import FontIcon from 'material-ui/FontIcon';
import "../../../../../../styles/main.scss";
import "./style.scss";

class EntryAddForm extends React.Component {
  constructor(props) {
    super(props);
  }

  // Renders the text field configured in the main render() function
  renderTextField(field) {
    return (
      <div className="field-container text-box">
        {field.meta.touched ? field.meta.error : ""}
        <textarea
          className={field.styleclass}
          type="text"
          placeholder="Add an entry..."
          {...field.input}
        />

      </div>
    );
  }

  // Renders the numeric fields configured in the main render() function
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

  // Converts time inputs to minutes and dispatches createEntry action creator
  // with form values, then exits the form and re-fetches entries for the stream
  onSubmit(values) {
    let hoursInMinutes = values.hours * 60;
    let formattedValues = {
      content: values.content,
      minutes: Number(values.minutes) + Number(hoursInMinutes)
    };

    // dispatch createEntry then call onExit function to exit form
    this.props.createEntry(formattedValues, this.props.streamId, () => {
      this.props.onExit();
      this.props.fetchEntries(this.props.streamId);
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="entry-add-form">
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
            max="99"
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
            <button className="save" type="submit">SAVE</button>
          </div>
        </form>
        <div className="cancel" onClick={this.props.onExit}><FontIcon className="cancel material-icons">cancel</FontIcon></div>
      </div>
    );
  }
}

function validate(values) {
    const errors = {};
    if (!values.content) {
      errors.content = "Enter entry details";
    }
    return errors;
}

export default reduxForm({
  validate,
  form: "EntryAddForm"
})(
  connect(null, { createEntry, fetchEntries })(EntryAddForm)
);
