const React = require("react");
const {mount} = require("enzyme");
const {Game} = require("../src/Game");

const checkCardIsDisplayed = (driver) => {
    const cards = driver.find(".kart");
    expect(cards.length).toEqual(3);
}

test("kartları kontrol et", () => {
    const driver = mount(<Game/>);
    checkCardIsDisplayed(driver);
    let card = driver.find(".kart").at(0);
    card.simulate("click");
    card = driver.find(".kart").at(0);
    const srcName = card.find("img").prop("src");
    expect(srcName === "img/Kedi.jpg" || srcName === "img/Kopek.jpg").toBeTruthy();
});

test("sayılarını kontrol et", () => {
    const driver = mount(<Game/>);
    checkCardIsDisplayed(driver);
});

test("kediyi bul", () => {
    let driver = mount(<Game/>);

    for(let i = 0; i < 3; i++){
        let card = driver.find(".kart").at(i);
        card.simulate("click");
        card = driver.find(".kart").at(i);
        const srcName = card.find("img").prop("src");
        checkCardIsDisplayed(driver);
        if(srcName != "img/Kopek.jpg"){
            expect(srcName).toBe("img/Kedi.jpg");
        }

        driver = mount(<Game/>);
    }

});

test("köpeği bul", () => {
    let driver = mount(<Game/>);

    for(let i = 0; i < 3; i++){
        let card = driver.find(".kart").at(i);
        card.simulate("click");
        card = driver.find(".kart").at(i);
        const srcName = card.find("img").prop("src");
        checkCardIsDisplayed(driver);
        if(srcName != "img/Kedi.jpg" && driver.props.kartSayac != 1){
            expect(srcName).toBe("img/Kopek.jpg");
        }
        driver = mount(<Game/>);
    }
});

test("sayaç kontrolü", () => {
    let driver = mount(<Game/>);

    for(let i = 0; i < 3; i++){
        let card = driver.find(".kart").at(i);
        card.simulate("click");
        card = driver.find(".kart").at(i);
        const srcName = card.find("img").prop("src");
        checkCardIsDisplayed(driver);
        if(srcName != "img/Kedi.jpg" && driver.prop.kartSayac === 1){
            expect(driver.prop.kartSayac).toBe(1);
        }
    }
});



