import {ButtonComponent} from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {EditPage} from "../edit/index.js";

//import { ms_news } from "./news_ms.js";
import { getSumAndMultOfArray, equalArr, anagram } from "./my_func.js";

import {ajax} from "../../modules/ajax.js";
import {newUrls} from "../../modules/newUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.searchTerm = '';
        this.now_news = [];//this.getData();//[...ms_news];
    }
    
    getData() {
        ajax.get(newUrls.getNews(), (data) => {
            this.renderData(data); this.now_news = data;
        })
    }
    
    renderData(items) {
        items.forEach((item) => {
            const newCard = new ProductCardComponent(this.pageRoot)
            newCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this), this.editCard.bind(this))
        })
    }
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div class="search-container" style="margin-bottom: 20px;">
                    <input type="text" id="search-input" placeholder="Поиск новостей">
                    <button id="search-button">
                        Найти
                    </button>
                </div>
                <div id="main-page" class="d-flex flex-wrap"></div>
            `
        )
    }

    handleSearch() {
        const searchInput = document.getElementById('search-input');
        this.searchTerm = searchInput.value.toLowerCase().trim();
        
        if (this.searchTerm) {
            const filteredNews = this.now_news.filter(item => 
                item.title.toLowerCase().includes(this.searchTerm) || 
                item.text.toLowerCase().includes(this.searchTerm)
            );
            this.render(filteredNews);
        } else {
            this.render();
        }
    }
    
    
    setupSearch() {
        const searchButton = document.getElementById('search-button');
        const searchInput = document.getElementById('search-input');
        
        searchButton.addEventListener('click', () => this.handleSearch());
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    }



    clickCard(e) {
        let cardId = e.target.dataset.id
        const data = this.now_news;//this.getData()
        //const productPage = new ProductPage(this.parent, cardId, data[cardId-1].src, data[cardId-1].title, data[cardId-1].text)
        let getNew = data.find(news => news.id == cardId);
        const productPage = new ProductPage(this.parent, cardId, getNew.src, getNew.title, getNew.text)
        productPage.render();
    }

    editCard(e) {
        let cardId = e.target.dataset.id
        const data = this.now_news;
        let getNew = data.find(news => news.id == cardId);
        const editPage = new EditPage(this.parent, cardId, getNew.src, getNew.title, getNew.text)
        editPage.render();
    }

    /*deleteCard(e) {
        const cardId = e.target.dataset.id
        //ms_news = ms_news.filter(item => item.id !== cardId);

        const index = ms_news.findIndex(item => item.id === cardId);
        if (index !== -1) {
            ms_news = ms_news.splice(index, 1);
        }
        let new_ms_news = ms_news.filter(item => Number(item.id) !== Number(cardId))
        


        this.render(new_ms_news);
    }*/
    deleteCard(e) {
        const cardId = e.target.dataset.id
        this.now_news = this.now_news.filter(item => Number(item.id) !== Number(cardId));
        this.render();
    }


    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        console.log(this.now_news);
        if(this.now_news.length == 0){
        this.getData();
        }
        
        this.setupSearch();
        
        

        if (this.searchTerm) {
            this.now_news = this.now_news.filter(item => 
                item.title.toLowerCase().includes(this.searchTerm) || 
                item.text.toLowerCase().includes(this.searchTerm)
            );
        }


        let arr_ids = []
        this.now_news.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this), this.editCard.bind(this))

            arr_ids.push(Number(item.id))
        })


        let arr_sum_mult = getSumAndMultOfArray(arr_ids);
        this.parent.insertAdjacentHTML('beforeend', '<p class="box" style="color: white">Сумма ID: '+arr_sum_mult[0]+', произведение ID: '+arr_sum_mult[1]+'</p>');
        this.parent.insertAdjacentHTML('beforeend', '<p class="box" style="color: white">Схожи ли массивы [1, 2, 3, 8, -2] и [2, 3, 8, 1, -2]: '+equalArr([1, 2, 3, 8, -2], [2, 3, 8, 1, -2])+'</p>');
        this.parent.insertAdjacentHTML('beforeend', '<p class="box" style="color: white">Анаграммы для слов:<br><br>'+anagram( ['новости', 'свиноть', 'виность', 'репортаж', 'жаропете', 'событие', 'обвестиё', 'телевизор', 'зилотвере', 'корреспондент'])+'</p>');

    }
    
    
}






