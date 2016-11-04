'use strict';
import React, { Component, PropTypes } from 'react'
import R from 'ramda'

export default class AgAutocomplete extends Component {
  constructor(props) {
    super(props)

    this.search = null
    this.state = {
      values: []
    }
  }

  componentWillReceiveProps (nextProps) {
    if(this.search && this.props.defaultValue !== nextProps.defaultValue) {
      this.search.autocomplete.setVal(nextProps.defaultValue)
    }
  }

  componentDidMount() {
    //this thing sucks but for now it must be like this or window will be undefined.
    const algoliasearch = require('algoliasearch')
    const autocomplete = require('autocomplete.js')

    const {
      appId,
      apiKey,
      hitsPerPage,
      index,
      displayKey,
      options,
      inputId,
      defaultValue
    } = this.props

    const agClient = algoliasearch(appId, apiKey)
    const agIndex  = agClient.initIndex(index)

    const defaultOptions = {
      source: function(q, cb) {
        agIndex.search(q, { hitsPerPage: hitsPerPage || 10 }, (error, content) => {
          if (error) {
            cb([])
            return
          }
          cb(content.hits, content);
        })
      },
      displayKey: displayKey || 'value',
      templates: {
        suggestion: (suggestion) => {
          const key = this.props.keyName || 'name'
          return this.props.currentLanguage ? suggestion._highlightResult[key][this.props.currentLanguage].value :  suggestion._highlightResult[key].value
        }
      }
    }

    const agOptions = R.merge(defaultOptions, options)
    this.search = autocomplete(`#${inputId}`, agOptions, [agOptions])

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
    const  { otherProps, placeholder, inputId } = this.props

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
  index: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  keyName: PropTypes.string,
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
  displayKey: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.func
  ])
}
