import React from 'react';
import PropTypes from 'prop-types';
import TestRenderer from 'react-test-renderer';
import expect from 'expect';
import Translator from '@u-wave/translate';
import { TranslateProvider, translate, Interpolate } from '../src';

describe('translate', () => {
  const translator = new Translator({
    test: 'key',
  });

  it('should inject a `t` prop', () => {
    const Component = translate()(({ t }) => (
      <p>
        {t('test')}
      </p>
    ));

    const renderer = TestRenderer.create((
      <TranslateProvider translator={translator}>
        <Component />
      </TranslateProvider>
    ));

    expect(renderer.toJSON().children).toEqual(['key']);
  });
});

describe('Interpolate', () => {
  const translator = new Translator({
    welcome: 'Welcome {{name}}!',
  });

  it('should accept React elements as interpolation data', () => {
    const Welcome = ({ name }) => (
      <Interpolate
        i18nKey="welcome"
        name={(
          <strong>
            {name}
          </strong>
        )}
      />
    );
    Welcome.propTypes = {
      name: PropTypes.string.isRequired,
    };

    const renderer = TestRenderer.create((
      <TranslateProvider translator={translator}>
        <Welcome name="World" />
      </TranslateProvider>
    ));

    expect(renderer.toJSON()).toEqual([
      'Welcome ',
      { type: 'strong', props: {}, children: ['World'] },
      '!',
    ]);
  });
});
