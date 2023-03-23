import Router from './config/routes';
import './App.css';
import { Provider } from 'react-redux'
import { store } from './app/store';

function App() {
  return (
    <Provider store={store}>
      <Router/>
    </Provider>
  );
}

export default App;
