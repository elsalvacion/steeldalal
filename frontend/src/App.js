import {Provider} from 'react-redux'
import store from './store'
import {HashRouter, Route, Switch} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import Nav from './components/layout/Nav';
import { useEffect } from 'react';
import Footer from './components/layout/Footer';
const App = () => {
  useEffect(() => {
    const body = document.querySelector('.app');
    const footer = document.querySelector('.footer')
    body.style.paddingBottom = `${footer.clientHeight + 50}px`
    window.addEventListener('resize', () => {
      const body = document.querySelector('.app');
    const footer = document.querySelector('.footer')
    body.style.paddingBottom = `${footer.clientHeight + 50}px`
    })
  }, [])
  return (
    <Provider store={store}>
      <HashRouter>
        <Nav />
        <Switch>
          <div className='app'>
          <Route exact path='/' component={HomeScreen} />
          </div>
        </Switch>
        <Footer />
      </HashRouter>
    </Provider>
  );
}

export default App;
