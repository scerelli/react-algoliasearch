# react-algoliasearch

A simple react component to integrate the Algolia search engine in your application.
You can configure your Algolia index, app Id and api Key by passing props to the component.

## Installation

```
npm install react-algoliasearch --save
```

## Example

```
import AgAutocomplete from 'react-algoliasearch';

...

render() {
  return (
    <div>
      <AgAutocomplete
        apiId={"latency"}
        displayKey="name"
        index={"contacts"}
        inputId="input-search"
        name="contacts"
        placeHolder="Search..."
        searchApiKey={"6be0576ff61c053d5f9a3225e2a90f76"}
      />
    </div>
  )
}
```
## Credits

[Moze](http://mozestudio.com/)
