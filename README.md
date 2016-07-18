# react-algoliasearch

A simple react component to integrate the Algolia search engine in your application.
You can configure your Algolia index, app Id and api Key by passing props to the component.



## Installation

`npm install react-algoliasearch --save`

## Example

```js
import AgAutocomplete from 'react-algoliasearch'
  ...

  render() {
    return (
      <div>
        <AgAutocomplete
          apiKey={"6be0576ff61c053d5f9a3225e2a90f76"}
          appId={"latency"}
          displayKey="name"
          index={"contacts"}
          inputId="input-search"
          placeholder="Search..."
        />
      </div>
    )
}
```

## Props

- `appId` - Your algoliasearch app ID. (required)
- `apiKey` - Your algoliasearch api key. (required)
- `currentLanguage` - If using a multilanguage dataset, pass your current language through this prop. (optional)
- `displayKey` - For a given suggestion object, determines the string representation of it. This will be used when setting the value of the input control after a suggestion is selected.
Can be either a key string or a function that transforms a suggestion object into a string. Defaults to value. (optional)
- `index` - The Algolia index you want to connect. (required)
- `inputId` - The Id of the generated input field. (required)
- `placeholder` - The input's placeholder. (optional)
- `hitsPerPage` - The number of results that your search will produce. Default is 10. (optional)
- `options` - Pass any other [autocomplete.js](https://github.com/algolia/autocomplete.js) option through this object prop. (optional)

Any other React prop can be passed through `otherProps`

### Custom Events Props

- `opened` – Triggered when the dropdown menu of the autocomplete is opened. (optional)
- `shown` – Triggered when the dropdown menu of the autocomplete is shown (opened and non-empty). (optional)
- `closed` – Triggered when the dropdown menu of the autocomplete is closed. (optional)
- `updated` – Triggered when a dataset is rendered. (optional)
- `cursorchanged` – Triggered when the dropdown menu cursor is moved to a different suggestion. The event handler will be invoked with 3 arguments: the event object, the suggestion object, and the name of the dataset the suggestion belongs to. (optional)
- `selected` – Triggered when a suggestion from the dropdown menu is selected. The event handler will be invoked with 3 arguments: the event object, the suggestion object, and the name of the dataset the suggestion belongs to. (optional)
- `autocompleted` – Triggered when the query is autocompleted. Autocompleted means the query was changed to the hint. The event handler will be invoked with 3 arguments: the event object, the suggestion object, and the name of the dataset the suggestion belongs to. (optional)


