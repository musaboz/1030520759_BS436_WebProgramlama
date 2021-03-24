const imageArray = [{
        src: "./img/hiddencat.jpg",
        id: "img0",
        flag: true
    },
    {
        src: "./img/hiddencat.jpg",
        id: "img1",
        flag: false
    },
    {
        src: "./img/hiddencat.jpg",
        id: "img2",
        flag: false
    },
];

export const sendArray = (index) => {
    const selection = Array(index);

    let i = 0;
    while(i < index){
        const k = Math.floor(imageArray.length * Math.random());
        if(selection.includes(k)){
            continue;
        }
        selection[i] = k;
        i++;
    }
    return Array.from(selection).map(e=>imageArray[e]);
}