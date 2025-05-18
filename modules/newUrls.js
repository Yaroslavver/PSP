class NewUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getNews() {
        return `${this.baseUrl}/news`;
    }

    getNewById(id) {
        return `${this.baseUrl}/news/${id}`;
    }

    createNew() {
        return `${this.baseUrl}/news`;
    }

    removeNewById() {
        return `${this.baseUrl}/news/${id}`;
    }

    updateNewById() {
        return `${this.baseUrl}/news/${id}`;
    }
}

export const newUrls = new NewUrls();