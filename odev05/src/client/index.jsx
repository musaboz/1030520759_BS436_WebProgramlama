import React from "react";
import  ReactDOM from "react-dom";
import {Game} from "./Game";
import {Route, Switch} from "react-router";
import Home from "./home";
import {HashRouter} from "react-router-dom";

const notFound = () => {
    return (
        <div>
            <h2>Sayfa bulunamadı: 404</h2>
            <p>
                Hata: Aradığınız sayfaya şu anda ulaşılamıyor. Lütfen daha sonra tekrar deneyiniz.
            </p>
        </div>
    )
}

class App extends React.Component{
    render() {
        return(
            <HashRouter>
                <Switch>
                    <Route exact path='/Game' component={Game}/>
                    <Route exact path='/' component={Home}/>
                    <Route component={notFound}/>
                </Switch>
            </HashRouter>
        )
    }
}
ReactDOM.render(<App />, document.getElementById("root"));

