import React from 'react';
import Fork from 'react-ghfork';
import pkgInfo from '../package.json';
import AgAutocomplete from '../src/index.js';

export default class App extends React.Component {

  displayKey(data) {
    return `${data.name}, ${data.city}`
  }

  suggestionSelected(event, suggestion, dataset) {
    console.log(event)
    console.log(suggestion)
    console.log(dataset)
  }

  render() {
    //change appId and searchApiKey with your own keys
    //change index with your own index
    return (
      <div>
        <Fork className="right" project={pkgInfo.user + '/' + pkgInfo.name} />

        <AgAutocomplete
        apiKey={"6be0576ff61c053d5f9a3225e2a90f76"}
        appId={"latency"}
        displayKey={this.displayKey}
        index={"contacts"}
        inputId="input-search"
        placeholder="Search..."
        selected={this.suggestionSelected}
        />
      </div>
    )
  }
}
