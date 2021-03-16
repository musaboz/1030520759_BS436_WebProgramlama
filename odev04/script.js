const imageArray = [{
        src: "./img/hiddencat.jpg",
        class: "kart",
        id: "img0",
        flag: true
    },
    {
        src: "./img/hiddencat.jpg",
        class: "kart",
        id: "img1",
        flag: false
    },
    {
        src: "./img/hiddencat.jpg",
        class: "kart",
        id: "img2",
        flag: false
    },
];

var arrayLength = imageArray.length;
var newArray = [];

var arr = [];
while (arr.length < 3) {
    var r = Math.floor(Math.random() * arrayLength);
    if (arr.indexOf(r) === -1) {
        arr.push(r);
    }
}

for (var i = 0; i < arrayLength; i++) {
    newArray[i] = new Image();
    newArray[i].src = imageArray[i].src;
    newArray[i].class = imageArray[i].class;
    newArray[i].id = imageArray[i].id;
    newArray[i].flag = imageArray[i].flag;
}

var html = "";

arr.forEach((i) => {
    html += `<img id=${newArray[i].id} class=${newArray[i].class} src=${newArray[i].src} onclick="findCat(${newArray[i].flag}, ${i})";>`;
    document.getElementById("resim").innerHTML = html;
});

var hak = 2;

function findCat(flag, i) {
    if (flag) {
        id = newArray[i].id;
        document.getElementById(`${id}`).src = "./img/cat.jpg";
        document.getElementById("alanId").style.display = "none";
        document.getElementById("kazandiId").style.display = "block";
        document.getElementById("yenildiId").style.display = "none";

        document.getElementById("img1").src = "./img/dog.jpg";
        document.getElementById("img2").src = "./img/dog.jpg";
    } else {
        id = newArray[i].id;
        // alert("Yanlış Cevap");
        document.getElementById(`${id}`).src = "./img/dog.jpg";
        while (hak > 0) {
            if(newArray[i].src != "./img/cat.jpg"){
                console.log(hak);
                hak--;
                console.log(hak);
                break;
            }
        }
        if(hak === 0){
            document.getElementById("alanId").style.display = "none";
            document.getElementById("kazandiId").style.display = "none";
            document.getElementById("yenildiId").style.display = "block";

            document.getElementById("img0").src = "./img/cat.jpg";
            if(id === "img1"){
                document.getElementById("img2").src = "./img/dog.jpg";
            }else{
                document.getElementById("img1").src = "./img/dog.jpg";
            }
        }
    }
}