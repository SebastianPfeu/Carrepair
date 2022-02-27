/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import Aside from '../components/Aside';
import { addCar } from '../actions';

const renderField = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={placeholder} type={type} className="form-control" />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.addCar(this.props.garage, values, () => {
      this.props.history.push('/');
    });
  }

  required = value => value ? undefined : 'Required';
  allUppercase = value => value && !/^[A-Z ]*$/.test(value) ? 'Only uppercase letters are valid' : undefined;

  render() {
    return [
      <Aside key="aside" garage={this.props.garage}>
        <Link to="/">Back to list</Link>
      </Aside>,
      <div key="add" className="form-container" style={{ backgroundImage: "url('/assets/images/form.jpg')" }}>
        <div className="overlay" />
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <Field name="brand" type="text" placeholder="Aston Martin" label="Brand" component={renderField} validate={this.required} />
          </div>
          <div className="form-group">
            <Field name="model" type="text" placeholder="DB Mark III" label="Model" component={renderField} validate={this.required} />
          </div>
          <div className="form-group">
            <Field name="owner" type="text" placeholder="James Bond" label="Owner" component={renderField} validate={this.required} />
          </div>
          <div className="form-group">
            <Field name="plate" type="text" placeholder="DB Mark III" label="Plate" component={renderField} validate={[this.required, this.allUppercase]} />
          </div>
          <button type="submit">Add car</button>
        </form>
      </div>
    ];
  }
}

function mapStateToProps(state) {
  return {
    garage: state.garage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCar }, dispatch);
}

export default reduxForm({ form: 'newCarForm ' })(connect(mapStateToProps, mapDispatchToProps)(CarsNew));
