import AppRoutes from "./app/routes/AppRoutes";

import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_MODE == "LIVE" ? import.meta.env.VITE_API_BASE_URL : "/api";

store.subscribe( () =>
{
  console.log( 'store', store.getState() );
  localStorage.setItem( 'userSession', JSON.stringify( store.getState() ) );
} );

function App ()
{

  return (
    <Provider store={ store } >
      <AppRoutes />
    </Provider >
  )
}

export default App
