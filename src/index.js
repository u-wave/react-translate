import React from 'react';
import PropTypes from 'prop-types';

/** @typedef {{
 *    t: (key: string, data: object) => string,
 *    parts: (key: string, data: object) => any[],
 *  }} Translator */

/** @type {React.Context<Translator | undefined>} */
// @ts-ignore TS2322: the assigned type is narrower than the identifier's so this is fine
const TranslateContext = React.createContext(undefined);

/**
 * Make a translator instance available to the context. Children of this `TranslateProvider` element
 * can access the translator instance using `useTranslate()` or `Interpolate` as listed below.
 *
 * ```js
 * const translator = new Translator(...);
 *
 * <TranslateProvider translator={translator}>
 *   <App />
 * </TranslateProvider>
 * ```
 *
 * @param {{ translator: Translator, children: JSX.Element }} props
 */
export const TranslateProvider = ({ translator, children }) => (
  <TranslateContext.Provider value={translator}>
    {children}
  </TranslateContext.Provider>
);
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  TranslateProvider.propTypes = {
    translator: PropTypes.shape({
      t: PropTypes.func.isRequired,
      parts: PropTypes.func.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
  };
}

/**
 * Get the `@u-wave/translate` instance from the context. Destructuring the `t` function is the
 * recommended way to use this instance. This can be used in place of the `translate()` HOC in
 * function components to avoid introducing additional nesting and PropTypes requirements.
 *
 * @returns {Translator}
 */
export function useTranslator() {
  const context = React.useContext(TranslateContext);
  if (context === undefined) {
    throw new Error('useTranslator() can only be used within a TranslateContext');
  }
  return context;
}

/**
 * @template {object} TProps
 * @returns {(Component: React.ComponentType<TProps>) =>
 *               React.ComponentType<TProps & { t: Translator['t'] }>}
 */
export function translate() {
  return (Component) => (props) => {
    const { t } = useTranslator();

    return (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        t={t}
      />
    );
  };
}

/**
 * Translate the key given in the `i18nKey` prop. The other props are used as the interpolation
 * data. Unlike `useTranslate()`, this component can interpolate other React elements:
 *
 * ```js
 * <Interpolate
 *   i18nKey="welcome"
 *   name={(
 *     <strong>{name}</strong>
 *   )}
 * />
 * ```
 *
 * Here, the `name` prop is a React element, and it will be rendered correctly.
 *
 * @param {{ [key: string]: unknown, i18nKey: string }} props
 */
export function Interpolate({ i18nKey, ...props }) {
  const { parts } = useTranslator();

  return (
    // Manually use createElement so we're not passing an array as children to React.
    // Passing the array would require us to add keys to each interpolated element
    // but we know that the shape will stay the same so it's safe to spread it and act
    // as if they were all written as separate children by the user.
    React.createElement(React.Fragment, {}, ...parts(i18nKey, props))
  );
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  Interpolate.propTypes = {
    i18nKey: PropTypes.string.isRequired,
  };
}
