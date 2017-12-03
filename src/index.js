'use strict';
import React, { Component } from 'react';
import deepAssign from 'deep-assign';
import PropTypes from 'prop-types';

export default class AgAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.search = null;
    this.state = {
      values: []
    };
  }

  componentWillReceiveProps (nextProps) {
    if(this.search && this.props.defaultValue !== nextProps.defaultValue) {
      this.search.autocomplete.setVal(nextProps.defaultValue);
    }
  }

  componentDidMount() {
    //this thing sucks but for now it must be like this or window will be undefined.
    const algoliasearch = require('algoliasearch');
    const autocomplete = require('autocomplete.js');

    const {
      appId,
      apiKey,
      hitsPerPage,
      indices,
      displayKey,
      options,
      inputId,
      keyName,
      currentLanguage,
      defaultValue,
      filtersQuery
    } = this.props;

    const agClient = algoliasearch(appId, apiKey);
    const indicesOptions = [];

    indices.map((item) => {
      const {
        index,
        displayKey: itemDisplayKey,
        hitsPerPage: itemHitsPerPage,
        keyName: itemKeyName,
        options: itemOptions
      } = item;
      const agIndex = agClient.initIndex(index);
      const hitsLimit = itemHitsPerPage ? itemHitsPerPage : (hitsPerPage || 10);
      const indexOptions = {
        source: function(query, cb) {
          agIndex.search(query, { hitsPerPage: hitsLimit, filters: filtersQuery || '' })
            .then(data => {
              return cb(data.hits, data);
            })
            .catch(error => {
              console.log(error);
              return cb([]);
            });
        },
        displayKey: itemDisplayKey ? itemDisplayKey : (displayKey || 'value'),
        templates: {
          suggestion: (suggestion) => {
            const key = itemKeyName ? itemKeyName : (keyName || 'name');

            if (currentLanguage) {
              return suggestion._highlightResult[key][this.props.currentLanguage].value;
            }

            return suggestion._highlightResult[key].value;
          }
        }
      }
      const agOptions = deepAssign(indexOptions, itemOptions);

      indicesOptions.push(agOptions);
    });
    
    this.search = autocomplete(`#${inputId}`, options, indicesOptions);

    this.search
      .on('autocomplete:opened', this.props.opened)
      .on('autocomplete:shown', this.props.shown)
      .on('autocomplete:closed', this.props.closed)
      .on('autocomplete:updated', this.props.updated)
      .on('autocomplete:cursorchanged', this.props.cursorchanged)
      .on('autocomplete:selected', this.props.selected)
      .on('autocomplete:autocompleted', this.props.autocompleted)

    defaultValue ? this.search.autocomplete.setVal(defaultValue) : false
  }

  render() {
    const  { otherProps, placeholder, inputId } = this.props;

    return (
      <input
        id={inputId}
        placeholder={placeholder || 'Enter a search term...'}
        {...otherProps} />
    )
  }
}

AgAutocomplete.defaultProps = {
  options: {},
  opened: () => {},
  shown: () => {},
  closed: () => {},
  updated: () => {},
  cursorchanged: () => {},
  selected: () => {},
  autocompleted: () => {}
}

AgAutocomplete.propTypes = {
  apiKey: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  currentLanguage: PropTypes.string,
  hitsPerPage: PropTypes.number,
  indices: PropTypes.array.isRequired,
  inputId: PropTypes.string.isRequired,
  keyName: PropTypes.string,
  filtersQuery: PropTypes.string,
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.object,
  otherProps: PropTypes.object,
  opened: PropTypes.func,
  shown: PropTypes.func,
  closed: PropTypes.func,
  updated: PropTypes.func,
  cursorchanged: PropTypes.func,
  selected: PropTypes.func,
  autocompleted: PropTypes.func,
  placeholder: PropTypes.string,
  displayKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ])
}
