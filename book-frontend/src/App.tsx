import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navigator from "./navigator/Navigator";
import './App.css';
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const App = () => {
  const stripePromise = loadStripe('pk_test_51HzSHtFdvOMEPwYskkoMA2q93HT9Tka9gnolddw8GP9fHD9VmxLTlD31SU64qg14CrqGG694aosyrY3qjU76oM3u00QEUv0iGO');
  const token = localStorage.getItem('token');
  if(token){
    axios.defaults.headers.common['Authorization'] = "bearer "+token.replaceAll('"', '')
  }

  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <Navigator />
      </Elements>
    </Provider>
    
  )
}

export default App;
