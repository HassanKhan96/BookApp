import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navigator from "./navigator/Navigator";
import axios from "axios";


const App = () => {

  const token = localStorage.getItem('token');
  if(token){
    axios.defaults.headers.common['Authorization'] = "bearer "+token.replaceAll('"', '')
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
    
  )
}

export default App;
