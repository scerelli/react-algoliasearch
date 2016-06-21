'use strict';
import React, { Component, PropTypes } from 'react'
import R from 'ramda'

export default class AgAutocomplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: []
    }
  }

  componentDidMount() {
    //this thing sucks but for now it must be like this or window will be undefined.
    const algoliasearch = require('algoliasearch')
    const autocomplete = require('autocomplete.js')
    const {
      apiId,
      searchApiKey,
      index,
      displayKey,
      options,
      inputId
    } = this.props

    const agClient = algoliasearch(apiId, searchApiKey)
    const agIndex  = agClient.initIndex(index)

    const defaultOptions = {
      source: function(q, cb) {
        agIndex.search(q, { hitsPerPage: 10 }, (error, content) => {
          if (error) {
            cb([])
            return
          }
          cb(content.hits, content);
        })
      },
      displayKey: displayKey,

      templates: {
        suggestion: (suggestion) => {
          return this.props.index === 'Locations' && this.props.currentLanguage ? suggestion._highlightResult.name[this.props.currentLanguage].value :  suggestion._highlightResult.name.value
        }
      }
    }

    const AgOptions = R.merge(defaultOptions, options)
    autocomplete(`#${inputId}`, {hint: false}, [AgOptions])
  }

  render() {
    return (
      <input id={this.props.inputId} placeholder={this.props.placeHolder || 'Enter a search term...' } {...this.props} />
    )
  }
}

AgAutocomplete.defaultProps = {
  options: {}
}

AgAutocomplete.propTypes = {
  apiId: PropTypes.string.isRequired,
  currentLanguage: PropTypes.string,
  displayKey: PropTypes.string.isRequired,
  hitsPerPage: PropTypes.number,
  index: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  options: PropTypes.object,
  searchApiKey: PropTypes.string.isRequired,
  placeHolder: PropTypes.string
}
