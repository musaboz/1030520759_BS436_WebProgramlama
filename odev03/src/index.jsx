import React from "react";
import ReactDOM from "react-dom";
import { sendArray } from "./script";

let hak = 2;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: sendArray(3)
        };
    }
    
    handleClick = (image) => {
        var index = "";
        index = image.id;
        if (image.flag) {
            document.getElementById(`${index}`).src = "./img/cat.jpg";
            document.getElementById("alanId").style.display = "none";
            document.getElementById("kazandiId").style.display = "block";
            document.getElementById("yenildiId").style.display = "none";

            document.getElementById("img1").src = "./img/dog.jpg";
            document.getElementById("img2").src = "./img/dog.jpg";
        }
        else {
            document.getElementById(`${index}`).src = "./img/dog.jpg";
            while (hak > 0) {
                if (image.src != "./img/cat.jpg") {
                    hak--;
                    break;
                }
            }
            if (hak === 0) {
                document.getElementById("alanId").style.display = "none";
                document.getElementById("kazandiId").style.display = "none";
                document.getElementById("yenildiId").style.display = "block";

                document.getElementById("img0").src = "./img/cat.jpg";
                if (index === "img1") {
                    document.getElementById("img2").src = "./img/dog.jpg";
                } else {
                    document.getElementById("img1").src = "./img/dog.jpg";
                }
            }
        }
    }

    render() {
        const images = [];
        this.state.picture.forEach((i) => {
            images.push(i);
        })

        return (
            <div>
                <img id={images[0].id} className="kart" src={images[0].src} onClick={() => { this.handleClick(images[0]) }} />
                <img id={images[1].id} className="kart" src={images[1].src} onClick={() => { this.handleClick(images[1]) }} />
                <img id={images[2].id} className="kart" src={images[2].src} onClick={() => { this.handleClick(images[2]) }} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"))