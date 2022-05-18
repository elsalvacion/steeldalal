import {Provider} from 'react-redux'
import store from './store'
import {HashRouter, Route, Switch} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import ProductScreen from './screens/ProductScreen';
const App = () => {
 
  return (
    <Provider store={store}>
      <HashRouter>
        <Nav />
        <Switch>
          <div className='app'>
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/product/:id' component={ProductScreen} />
          </div>
        </Switch>
        <Footer />
      </HashRouter>
    </Provider>
  );
}

export default App;
