import {ButtonComponent} from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";

let ms_news = [
    {
        id: 1,
        src: "https://leonardo.osnova.io/94967adf-4128-5aaa-974f-07f1811300a4",
        title: "Спрос на дубайский шоколад спровоцировал дефицит фисташек на мировом рынке",
        text: "В России в преддверии Пасхи тренд получил новый виток, на маркетплейсах продавали «дубайские» куличи. Так называемая дубайская шоколадка — это плитка молочного шоколада с толстыми бортиками и хрустящей начинкой с фисташковой пастой."
    },
    {
        id: 2,
        src: "https://leonardo.osnova.io/b0d65357-df44-5cce-b865-4879884d8af7",
        title: "Российско-американский экипаж корабля «Союз МС-26» успешно вернулся на Землю с МКС",
        text: "Спускаемый аппарат корабля «Союз МС-26» приземлился в Казахстане вблизи города Жезказган в 4:20 мск. В нём на Землю вернулись космонавты «Роскосмоса» Алексей Овчинин и Иван Вагнер, а также астронавт NASA Дональд Петтит. Сведение с орбиты и спуск прошли штатно, сообщила пресс-служба «Роскосмоса». Космонавту Алексею Овчинину после приземления вручили пасхальное яйцо в честь праздника."
    },
    {
        id: 3,
        src: "https://leonardo.osnova.io/f6a17835-b862-507d-809f-fa62df3da5e5",
        title: "В Китае запустили «первую» сеть со скоростью до 10 Гбит/с с технологией 50G PON",
        text: "Пока широкополосное кабельное подключение работает в районе Сюнъань вблизи Пекина. В будущем в стране появится ещё 168 локаций с 10-гигабитным подключением, пишет китайское издание Mydrivers. Компания использует «первую в мире» технологию 50G PON."
    },     
    {
        id: 4,
        src: "https://leonardo.osnova.io/92e17535-3049-5fa3-ae86-e4bf4271855d",
        title: "50 триллионов инвестиций для девелоперов: как краудлендинг влияет на рынок недвижимости",
        text: "Для девелоперов открываются большие возможности: привлекать частные инвестиции через коллективное инвестирование. Это когда много людей скидываются на вашу мечту, чтобы потом с гордостью говорить: «Я тоже в этом участвовал!». Согласно анализу BusinesStat, к 2025 году рынок краудфандинга в России вырос в 8 раз. За период с 2020 по 2024 год оборот увеличился с 7 до 53 миллиардов рублей."
    },       
];

function getSumAndMultOfArray(arr){
    if(arr){
        let arr_sum = 0;
        let arr_mult = 1;
        for (let elem in arr){
            arr_sum += Number(arr[elem]);
            arr_mult *= Number(arr[elem]);
        }
        return [arr_sum, arr_mult];
    }
    else{return 0;}
}

function equalArr(arr1, arr2){
    if(arr1 && arr2 && arr1.length === arr2.length){
        let elems = {};        
        for (let num of arr1) {
            if(elems[num]){
                elems[num] = elems[num] + 1;
            }
            else{
                elems[num] = 1;
            }
        }        
        for (let num of arr2) {
            if (!elems[num]) {
                return false;
            }
            elems[num]--;
        }        
        return true;
    }
    else{return false;}
}

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    getData() {
        return ms_news;
    }
        
    
    
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="main-page" class="d-flex flex-wrap"><div/>
            `
        )
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id
        const data = ms_news;//this.getData()
        const productPage = new ProductPage(this.parent, cardId, data[cardId-1].src, data[cardId-1].title, data[cardId-1].text)
        productPage.render();
    }


    deleteCard(e) {
        const cardId = e.target.dataset.id
        //ms_news = ms_news.filter(item => item.id !== cardId);

        const index = ms_news.findIndex(item => item.id === cardId);
        if (index !== -1) {
            ms_news = ms_news.splice(index, 1);
        }
        let new_ms_news = ms_news.filter(item => Number(item.id) !== Number(cardId))
        


        this.render(new_ms_news);
    }


    render(my_ms_news) {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        let data;
        if(!my_ms_news){data = ms_news;}
        else{data = my_ms_news; ms_news = my_ms_news;}
        
        let arr_ids = []
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this))

            arr_ids.push(Number(item.id))
        })


        let arr_sum_mult = getSumAndMultOfArray(arr_ids);
        this.parent.insertAdjacentHTML('beforeend', '<p style="color: white">Сумма ID: '+arr_sum_mult[0]+', произведение ID: '+arr_sum_mult[1]+'</p>');
        this.parent.insertAdjacentHTML('beforeend', '<p style="color: white">схожи ли массивы [1, 2, 3, 8, -2] и [2, 3, 8, 1, -2]: '+equalArr([1, 2, 3, 8, -2], [2, 3, 8, 1, -2])+'</p>');


    }
    
    
}






