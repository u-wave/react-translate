# @u-wave/react-translate

React components for [@u-wave/translate][].

[Install][] - [Usage][] - [Demo][] - [Props][]

## Install

```
npm install --save @u-wave/react-translate
```

## Usage

[Demo][] - [Demo source code][]

```js
import Translator from '@u-wave/translate';
import { TranslateProvider } from '@u-wave/react-translate';

const language = {
  title: 'My App',
  welcome: 'Welcome {{name}}!',
};

const translator = new Translator(language, options);

// Add the translator instance to context.
<TranslateProvider translator={translator}>
  <App />
</TranslateProvider>

// Use translation strings in components via the translate() HOC.
import { translate } from '@u-wave/react-translate';
const AppTitle = translate()(({ t }) => (
  <h1>{t('title')}</h1>
));

// Use React components inside translation strings.
import { Interpolate } from '@u-wave/react-translate';
const Welcome = ({ name }) => (
  <Interpolate
    i18nKey="welcome"
    name={(
      <strong>{name}</strong>
    )}
  />
);
// Equivalent to "Welcome <strong>{name}</strong>!"
```

## API

### `<TranslateProvider translator={} />`

Make a translator instance available to the context. Children of this `TranslateProvider` element can access the translator instance using `translate()` or `Interpolate` as listed below.

```js
const translator = new Translator(...);

<TranslateProvider translator={translator}>
  <App />
</TranslateProvider>
```

### `TranslatedComponent = translate()(Component)`

Create a wrapper component that injects a prop named `t` into `Component`. The `t` prop is the [`Translator#t`](https://github.com/u-wave/translate#t) function for the Translator instance provided by `TranslateProvider`.

Make sure _not_ to do `translate(Component)`. `translate` is a function that returns a higher order component to allow adding options in a future release. The `Component` must be passed to the _result_ of this function, i.e. `translate()(Component)`.

```js
const enhance = translate();
const Component = ({ t }) => ...;

export default enhance(Component);
```

### `<Interpolate i18nKey="" />`

Translate the key given in the `i18nKey` prop. The other props are used as the interpolation data. Unlike `translate()`, this component can interpolate other React elements:

```js
<Interpolate
  i18nKey="welcome"
  name={(
    <strong>{name}</strong>
  )}
/>
```

Here, the `name` prop is a React element, and it will be rendered correctly.

## Changing Language

[@u-wave/translate][] instances contain a single language. To switch between languages, you can swap the instance in the `TranslateProvider` component. A good way to do this is to have a wrapper component that stores the Translator instance in state:

```js
import Translator from '@u-wave/translate';
import { TranslateProvider } from '@u-wave/react-translate';

const languages = {
  en: {},
  nl: {},
};
import en from '@u-wave/translate/plurals/en';
import nl from '@u-wave/translate/plurals/nl';
const plurals = { en, nl };

class TranslateWrap extends React.Component {
  state = {
    translator: new Translator(languages.en),
  };

  onChangeLanguage(newLanguage) {
    this.setState({
      translator: new Translator(languages[newLanguage], { plural: plurals[newLanguage] });
    });
  }

  render() {
    const { translator } = this.state;
    return (
      <TranslateProvider translator={translator}>
        <App onChangeLanguage={this.onChangeLanguage.bind(this)} />
      </TranslateProvider>
    );
  }
}
```

## Related

* [react-i18next](https://github.com/i18next/react-i18next) -

## License

[MIT][]

[Install]: #install
[Usage]: #usage
[Props]: #props
[Demo]: https://u-wave.github.io/react-translate
[Demo source code]: ./example
[MIT]: ./LICENSE
[@u-wave/translate]: https://github.com/u-wave/translate
