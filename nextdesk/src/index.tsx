import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from 'react-i18next';
import {App} from "./App"
import * as serviceWorker from "./serviceWorker";
import { Provider } from 'react-redux'
import store from "./Redux/store"

import { create } from "jss";

import i18n from "./i18n/i18n";
i18n.init({lng: 'cn'});
import "typeface-roboto";

import JssProvider from "react-jss/lib/JssProvider";
import {
    MuiThemeProvider,
    createGenerateClassName,
    jssPreset
} from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme"

// store.dispatch({
//   type: "changeEnglish"
// })
/**
 * We need customized jss provider to adjust css inject order. Or else the styled and useStyle
 * component style sheet will always be injected before the component stylesheets.
 */
const generateClassName = createGenerateClassName();
const jss = create({
    ...jssPreset(),
    // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
    insertionPoint: document.getElementById("jss-insertion-point")!
});

ReactDOM.render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <App/>
          </MuiThemeProvider>
        </JssProvider>
      </I18nextProvider>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
