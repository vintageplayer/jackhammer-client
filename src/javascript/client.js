import React from 'react'
import Root from './Root'
import configureStore from './Store'
import ReduxToastr from 'react-redux-toastr'
import localStorage from 'localStorage'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {AUTH_USER} from './Actions/ActionTypes'
import {PersistGate} from 'redux-persist/es/integration/react'

const {persistor, store,} = configureStore();
render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <div>
      <Root/>
      <ReduxToastr timeOut={4000} preventDuplicates progressBar/>
    </div>
  </PersistGate>
</Provider>, document.getElementById('root'));
