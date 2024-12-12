import {
  expect,
  describe,
  it,
} from 'vitest';
import React from 'react';
import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';
import Translator from '@u-wave/translate';
import {
  TranslateProvider,
  translate,
  Interpolate,
  useTranslator,
} from './index';

describe('translate', () => {
  const translator = new Translator({
    test: 'key',
  });

  it('should inject a `t` prop', () => {
    const Component = translate()(({ t }) => (
      <p data-testid="t">
        {t('test')}
      </p>
    ));

    render((
      <TranslateProvider translator={translator}>
        <Component />
      </TranslateProvider>
    ));

    expect(screen.getByTestId('t').textContent).toEqual('key');
  });
});

describe('Interpolate', () => {
  const translator = new Translator({
    welcome: 'Welcome {{name}}!',
  });

  it('should accept React elements as interpolation data', () => {
    function Welcome({ name }) {
      return (
        <p data-testid="interpolate">
          <Interpolate
            i18nKey="welcome"
            name={(
              <strong>
                {name}
              </strong>
            )}
          />
        </p>
      );
    }
    Welcome.propTypes = {
      name: PropTypes.string.isRequired,
    };

    render((
      <TranslateProvider translator={translator}>
        <Welcome name="World" />
      </TranslateProvider>
    ));

    expect(screen.getByTestId('interpolate').textContent).toEqual('Welcome World!');
    expect(screen.getByTestId('interpolate').innerHTML).toEqual('Welcome <strong>World</strong>!');
  });
});

describe('useTranslator', () => {
  const translator = new Translator({
    welcome: 'Welcome {{name}}!',
  });

  it('should accept React elements as interpolation data', () => {
    // eslint-disable-next-line react/prop-types
    function Component({ name }) {
      const { t } = useTranslator();
      return (
        <p data-testid="use">
          {t('welcome', { name })}
        </p>
      );
    }

    render((
      <TranslateProvider translator={translator}>
        <Component name="nobody" />
      </TranslateProvider>
    ));

    expect(screen.getByTestId('use').textContent).toEqual('Welcome nobody!');
  });
});
