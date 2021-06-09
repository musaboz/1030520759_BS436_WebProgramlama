import ReactDOM from "react-dom";
import {Game} from "./Game";
import {Route, Switch} from "react-router";
import {Home} from "./home";
import {HashRouter} from "react-router-dom";
import HeaderBar from "./headerbar";
import React, {Component} from 'react';
import Login from "./login";
import Signup from "./signup";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            errorMsg: null,
            userCount: 1
        }
    }

    fetchAndUpdateUserInfo = async () => {
        const url = "/api/user";
        let response;

        try{
            response = await fetch(url);
        }catch (e) {
            this.setState({errorMsg: "Sunucuya bağlanırken hata: " + e});
            return;
        }

        if(response.status === 401){
            this.updateLoggedInUser(null);
            return;
        }
        if(response.status !== 200){
            // TODO sayfada çeşitli uyarılar
        }else{
            const payload = await response.json();
            this.updateLoggedInUser(payload);
        }
    }

    updateLoggedInUser = (user) => {
        this.setState({user:user});
    }

    componentDidMount() {
        this.fetchAndUpdateUserInfo();

        let protocol = "ws:";

        if(window.location.protocol.toLowerCase() === "https:"){
            protocol = "wss:";
        }
        this.socket = new WebSocket(protocol + "//" + window.location.host);

        this.socket.onmessage = (event) => {
            const dto = JSON.parse(event.data);

            if(!dto || !dto.userCount){
                this.setState({userCount: "Hata"});
                return;
            }

            this.setState({userCount: dto.userCount});
        };
    }

    componentWillUnmount() {
        this.socket.close();
    }


    notFound = () => {
        return (
            <div>
                <h2>Sayfa bulunamadı: 404</h2>
                <p>
                    Hata: Aradığınız sayfaya şu anda ulaşılamıyor. Lütfen daha sonra tekrar deneyiniz.
                </p>
            </div>
        )
    }

    render() {
        const id = this.state.user ? this.state.user.id : null;
        return (
            <HashRouter>
                <div>
                    <HeaderBar userId={id}
                               updateLoggedInUser = {this.updateLoggedInUser}/>
                    <Switch>
                        <Route exact path='/Game' render={props=><Game
                            {...props}
                            user={this.state.user}
                            updateLoggedInUser={this.updateLoggedInUser}
                            fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                        />}/>
                        <Route exact path='/login' render={props=><Login
                            {...props}
                            user={this.state.user}
                            fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                        />}/>
                        <Route exact path='/signup' render={props=><Signup
                            {...props}
                            user={this.state.user}
                            fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                        />}/>
                        <Route exact path='/' render={props=><Home
                            {...props} user={this.state.user}
                            userCount = {this.state.userCount}
                            fetchAndUpdateUserInfo={this.fetchAndUpdateUserInfo}
                        />}/>
                        <Route component={this.notFound}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));