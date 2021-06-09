import React, {Component} from 'react';
import {Link} from "react-router-dom";


export class Home extends Component {
    componentDidMount() {
        if(this.props.user){
            this.props.fetchAndUpdateUserInfo();
        }
    }

    render() {
        const user = this.props.user;
        const loggedIn = user !== null && user !== undefined;
        return (
            <div>
                <h2>Kart Oyunu</h2>
                <p className="welcome-text">
                    Bu oyunda 3 kapalı kart içindeki kediyi bulman gerekmektedir.
                    İlk tercihte Kedi kartını bulamaz isen 2. seçim hakkı tanınacaktır.
                </p>
                <p>Online oyuncu sayısı: {this.props.userCount}</p>
                {
                    loggedIn?(
                        <div>
                            <Link className={"button"} to={"/Game"}>Oyna</Link>
                            <div className="action">
                                <p>Galibiyet: {user.victories}</p>
                                <p>Mağlubiyet: {user.victories}</p>
                            </div>
                        </div>
                    ): (<p>Oynamak için giriş yapınız</p>)
                }
            </div>
        );
    }
}