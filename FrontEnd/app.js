import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider} from "react-redux";
import appStore from './src/store/appStore.jsx';
import AppRouter from "./appRouter.js";

const App=()=>{

    return(
        <>
        <Provider store={appStore}>
        <AppRouter />
        </Provider>
        
        </>
    )
}

const parent =document.getElementById("root");
const root = ReactDOM.createRoot(parent);
root.render(<App />);
