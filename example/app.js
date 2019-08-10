/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import Translator from '@u-wave/translate';
import { TranslateProvider, translate, Interpolate } from '..';

const NAME = 'Example User';

const english = {
  title: 'My App',
  welcome: 'Welcome {{name}}!',
  languages: {
    en: 'English',
    nl: 'Nederlands (Dutch)',
  },
};
const dutch = {
  title: 'Mijn App',
  welcome: 'Welkom {{name}}!',
  languages: {
    en: 'Engels (English)',
    nl: 'Nederlands (Dutch)',
  },
};
const availableLanguages = { en: english, nl: dutch };

const LanguagePicker = translate()(({
  t, languages, currentLanguage, onChange,
}) => (
  <div className="collection">
    {languages.map((id) => (
      <button
        type="button"
        className={`collection-item ${id === currentLanguage ? 'active' : ''}`}
        onClick={() => onChange(id)}
      >
        {t(`languages.${id}`)}
      </button>
    ))}
  </div>
));

const AppView = translate()(({
  t, languages, language, onChangeLanguage,
}) => (
  <div className="row">
    <div className="col s3">
      <LanguagePicker
        languages={languages}
        currentLanguage={language}
        onChange={onChangeLanguage}
      />
    </div>
    <div className="col s9 center-align">
      <h2>
        {t('title')}
      </h2>
      <p>
        <Interpolate
          i18nKey="welcome"
          name={(
            <strong>
              {NAME}
            </strong>
          )}
        />
      </p>
    </div>
  </div>
));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: 'en',
      translator: new Translator(availableLanguages.en),
    };

    this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
  }

  handleChangeLanguage(language) {
    this.setState({
      language,
      translator: new Translator(availableLanguages[language]),
    });
  }

  render() {
    const { language, translator } = this.state;

    return (
      <TranslateProvider translator={translator}>
        <AppView
          languages={Object.keys(availableLanguages)}
          language={language}
          onChangeLanguage={this.handleChangeLanguage}
        />
      </TranslateProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('example'));
