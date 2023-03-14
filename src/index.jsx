import React from 'react';
import PropTypes from 'prop-types';

const TranslateContext = React.createContext();
const { Provider, Consumer } = TranslateContext;

export function TranslateProvider({ translator, children }) {
  return (
    <Provider value={translator}>
      {children}
    </Provider>
  );
}
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

export const translate = () => (Component) => (props) => (
  <Consumer>
    {(translator) => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        t={translator.t}
      />
    )}
  </Consumer>
);

export const useTranslator = () => React.useContext(TranslateContext);

export function Interpolate({ i18nKey, ...props }) {
  return (
    <Consumer>
      {(translator) => (
        // Manually use createElement so we're not passing an array as children to React.
        // Passing the array would require us to add keys to each interpolated element
        // but we know that the shape will stay the same so it's safe to spread it and act
        // as if they were all written as separate children by the user.
        React.createElement(React.Fragment, {}, ...translator.parts(i18nKey, props))
      )}
    </Consumer>
  );
}
/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  Interpolate.propTypes = {
    i18nKey: PropTypes.string.isRequired,
  };
}
