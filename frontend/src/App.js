import {Provider} from 'react-redux'
import store from './store'
import {HashRouter, Route, Switch} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import Nav from './components/layout/Nav';
const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Nav />
        <Switch>
          <div className='app'>
          <Route exact path='/' component={HomeScreen} />
          </div>
        </Switch>
      </HashRouter>
    </Provider>
  );
}

export default App;
