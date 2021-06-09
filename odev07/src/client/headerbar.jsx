import React, {Component, Fragment} from 'react';
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

class HeaderBar extends Component {
    doLogout = async () => {
        const url = "/api/logout";

        let response;
        try{
            response = await fetch(url, {method:"post"})
        }catch (e) {
            alert("Sunucuya bağlanmada hata: " + e);
            return;
        }

        if(response.status !== 204){
            alert("Sunucuya bağlanmada hata: " + response.status);
            return;
        }

        this.props.updateLoggedInUser(null);
        this.props.history.push("/");
    }

    renderLoggedIn = (userId) => {
        return (
            <React.Fragment>
                <p className="header-text">
                    Hoşgeldin {userId}
                </p>
                <button className="header-button" onClick={this.doLogout}>Çıkış</button>
            </React.Fragment>
        );
    }

    renderNotLoggedIn = () => {
        return(
            <React.Fragment>
                <p className="header-text">Giriş Yapmadınız</p>
                <div className="action-buttons">
                    <Link className="header-button" to="/login" tabIndex="0">
                        Giriş Yap
                    </Link>

                    <Link className="header-button" to="/signup" tabIndex="0">
                        Üye Ol
                    </Link>
                </div>
            </React.Fragment>
        )
    }

    render() {
        const userId = this.props.userId;

        let content;
        if(!userId){
            content = this.renderNotLoggedIn();
        }else{
            content = this.renderLoggedIn(userId);
        }

        return (
            <div className="header">
                <Link className="header-logo" to={"/"} tabIndex="0">
                    Kedi Bulma
                </Link>
                {content}
            </div>
        );
    }
}

export default withRouter(HeaderBar);