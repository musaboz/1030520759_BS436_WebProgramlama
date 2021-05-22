import React, {Component} from 'react';

export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kediIndex: Math.floor(Math.random()*3),
            durum: undefined,
            victory: false,
            defeat: false,
            kart: ["img/ArkaKapak.png","img/ArkaKapak.png","img/ArkaKapak.png"],
            kartSayac: 0,
            sayac: 2,
            oyunSonlandi: false
        }
    }

    componentDidMount() {
        this.yeniOyun();
    }

    yeniOyun = () => {
        this.setState({
            kediIndex: Math.floor(Math.random()*3),
            durum: undefined,
            victory: false,
            defeat: false,
            kart: ["img/ArkaKapak.png","img/ArkaKapak.png","img/ArkaKapak.png"],
            kartSayac: 0,
            sayac: 2,
            oyunSonlandi: false
        });
    }

    kediSec = (index) => {
        const { kart, kediIndex, kartSayac, oyunSonlandi, victory, defeat, sayac } = this.state;

        if(!oyunSonlandi){
            const yeniKart = [...kart];
            let durum;

            if(kediIndex===index){
                yeniKart[index] = "img/Kedi.jpg";
                durum = "Kazandınız :)"
                this.setState({
                    victory: true
                });
            }else {
                yeniKart[index] = "img/Kopek.jpg";
                if(kartSayac===1){
                    durum = "Kaybettiniz :("
                    this.setState({
                        defeat: true
                    });
                }
            }
            this.setState({
                kart: yeniKart,
                kartSayac: this.state.kartSayac+1,
                sayac: this.state.sayac - 1,
                durum
            });

            if(durum){
                this.setState({
                    oyunSonlandi: true
                })
            }

        }
    }


    render(){
        const { kart, victory, defeat, sayac, kediIndex } = this.state;
        if(victory){
            return(
                <div className="game-result">
                    <h2>Kazandın!</h2>
                    <img className="kart" src={kart[kediIndex]} />
                    <button className="play new-game-button" onClick={this.yeniOyun}>
                        Yeni Oyun
                    </button>
                </div>
            )
        }

        if(defeat){
            return(
                <div className="game-result">
                    <h2>Kaybettin :( Kedi'yi seçmen gerekiyordu.</h2>
                    <div className="action">
                        <button className="play new-game-button" onClick={this.yeniOyun}>
                            Yeni Oyun
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div>
                <p className="text">{sayac} hakkınız kaldı</p>
                <img className="kart" src={kart[0]} onClick={()=>{this.kediSec(0)}}/>
                <img className="kart" src={kart[1]} onClick={()=>{this.kediSec(1)}}/>
                <img className="kart" src={kart[2]} onClick={()=>{this.kediSec(2)}}/>
            </div>
        );
    }
}

