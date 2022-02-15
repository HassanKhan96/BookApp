import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navigator from "./navigator/Navigator";
import axios from "axios";
import { useEffect } from "react";

const App = () => {

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
    
  )
}

export default App;
