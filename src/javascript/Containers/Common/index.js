import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {customToolBarStyles} from '../CSSModules'

const addButton = (currentContext, routePath, addButtonTitle, addButtonRequired) => {
  if (addButtonRequired) {
    return (
      <button class="btn btn-success" onClick={() => renderToAddPage(currentContext, routePath)}>
        <i class="fa fa-plus" aria-hidden="true"></i>
        &nbsp;&nbsp;{addButtonTitle}
      </button>
    )
  } else {
    return null;
  }
};
export const createCustomToolBar = (props, currentContext, addButtonRequired = true, routePath = "", addButtonTitle = "") => {
  return (
    <div class="row" style={customToolBarStyles}>
      <div className='col-xs-6'>
        {addButton(currentContext, routePath, addButtonTitle, addButtonRequired)}
      </div>
      <div className='col-xs-4'></div>
      <div className='col-xs-2 pull-right'>
        {props.components.searchPanel}
      </div>
    </div>
  );
};

export const editFormatter = (editPath) => {
  return (
    <Link to={editPath} class="btn btn-primary edit" title="edit">
      <i class="glyphicon glyphicon-edit" aria-hidden="true"></i>
    </Link>
  )
};

export const selectionsRenderer = (values, hintText) => {
  if (!values)
    return hintText
  const {value, label} = values
  if (Array.isArray(values)) {
    return values.length
      ? values.map(({value, label}) => label || value).join(', ')
      : hintText
  } else if (label || value)
    return label || value
  else
    return hintText
};

export const renderToAddPage = (currentContext, url) => {
  currentContext
    .router
    .history
    .push(url, {state: "state"});
};

export const formatDate = (cellData) => {
  return moment(new Date(cellData)).format('DD-MM-YYYY');
};
export const formtTime = (time) => {
  return moment(new Date(time)).format('LLLL');
}

export const fetchDropdownOptions = (options) => {
  return options.map((option) => (
    <div key={option.id} value={option.id} label={option.name}>
      {option.name}
    </div>
  ));
};
