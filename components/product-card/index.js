export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card">
                    <div class="card-body">
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    <button class="btn btn-primary" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                        <h1 class="card-title">${data.title}</h1>
                        <p class="card-text">${data.text.length > 90 ? data.text.substring(0, 90)+'...' : data.text}</p>
                        
                    </div>
                    <img class="card-img-top" src="${data.src}" alt="картинка">
                </div>
            `
            /* */
        )
    }
    
    addListeners(data, listener, listener2) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
        document
        .getElementById(`delete-card-${data.id}`)
        .addEventListener('click', listener2);

    }

    render(data, listener, listener2) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener, listener2)
    }
    
    
    
}
