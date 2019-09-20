class ApiService {
    getDataFromServer (url) {
        return fetch(url)
        .then(response => response.json())
        .catch(error => alert(error));
    }
}

import URL from './urls.js';

export default new ApiService().getDataFromServer(URL.blog);