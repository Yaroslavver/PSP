import {ajax} from "../../modules/ajax.js";
import {newUrls} from "../../modules/newUrls.js";

export class EditComponent {
    constructor(parent) {
        this.parent = parent;
        this.len = 0;
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                                <p>Картинка: </p><input id="edit-src" class="card-title" value="${data.src}">
                                <p>Заголовок: </p><input id="edit-title" class="card-title" value="${data.title}">
                                <p>Описание: </p><input id="edit-text" class="card-text" type value="${data.text}"><br><br>
                                <button id="save-button" data-id="${data.id}">Сохранить изменения</button>
                                <button id="add-button" data-id="${data.id}">Создать новую</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }

    getLenData() {
        return new Promise((resolve, reject) => {
            ajax.get(newUrls.getNews(), (data) => {
                this.len = data.length;
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }

    addClickHandler(id, callback) {
        document.getElementById('save-button').addEventListener('click', () => {
            const updatedData = {
                src: document.getElementById('edit-src').value,
                title: document.getElementById('edit-title').value,
                text: document.getElementById('edit-text').value
            };
            
            ajax.patch(
                newUrls.getNewById(id), 
                updatedData, 
                (response) => {
                    if (callback) {
                        callback(response);
                    }
                }
            );
        });
        document.getElementById('add-button').addEventListener('click', () => {
            const updatedData = {
                src: document.getElementById('edit-src').value,
                title: document.getElementById('edit-title').value,
                text: document.getElementById('edit-text').value
            };
            ajax.post(
                newUrls.createNew(), 
                updatedData, 
                (response) => {
                    if (callback) {
                        callback(response);
                    }
                }
            );
        });
    }

    /*render(data) {
        this.getLenData()
        console.log(this.len);
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addClickHandler(data.id, () => {});
    }*/
    async render(data) {
        try {
            await this.getLenData();
            
            const html = this.getHTML(data);
            this.parent.insertAdjacentHTML('beforeend', html);
            this.addClickHandler(data.id, () => {});
        } catch (error) {
            console.error(error);
        }
    }
}
