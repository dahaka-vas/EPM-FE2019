//============ ПЕРЕМЕННЫЕ > ============//

const URL = {blog: 'https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts'};

//============ < ПЕРЕМЕННЫЕ ============//



//============ ФУНКЦИИ > ============//

// function getRandom (min, max) {
//     return Math.floor (Math.random() * (max - min + 1)) + min;
// }

function avgRating (r) {
    r = Math.floor (r.reduce((sum, current) => sum + current) / 100) / 10;
    return r;
}

//============ < ФУНКЦИИ ============//



//============ КЛАССЫ > ============//

class ServerApi {
    constructor(url) {
        this.url = url;
    }

    getDataFromServer (url) {
        return fetch(url)
        .then(response => response.json())
        .catch(error => alert(error));
    }
}

class Renderable {
    render () {
        throw new Error('Метода Render не существует')
    }
}

class Blog extends Renderable {
    constructor() {
        super();
        // this.posts = this.fillPosts();
        this.posts = new ServerApi().getDataFromServer(URL.blog);
    }

    fillPosts () {
        // new ServerApi(URL.blog).getDataFromServer().then(data => this.posts = data);
        let posts = new ServerApi(URL.blog).getDataFromServer();
        return posts;
    }

    avgRatingSort () {
        this.posts.then(data => {
            data.map((item, i) => item.avgRating = avgRating (data[i].ratings));
            data.sort((a, b) => b.avgRating - a.avgRating);
        })
    }

    render (selector, RENDER_COL = 3) {
        // RENDER_COL = количество выводимых статей в блоке
        this.posts.then(data => {
            data.slice(0, RENDER_COL).forEach((item, i) => {
                const renderTopics = document.createElement('div');
                renderTopics.innerHTML = '<span class="badge badge-secondary">' +
                                        item.topics.join('</span> <span class="badge badge-secondary">') +
                                        '</span>';
                document.querySelectorAll ('.' + selector + ' > .blog_h3')[i].innerHTML = item.title;
                if (item.avgRating) {
                    document.querySelectorAll ('.' + selector + ' > .rating')[i].innerHTML = 'Rating: ' + item.avgRating.toFixed(1);
                }
                document.querySelectorAll ('.' + selector + ' > .topics')[i].append(renderTopics);
            })
        })
    }
}

//============ < КЛАССЫ ============//



//============ КОД > ============//

const blogPosts = new Blog();
// blogPosts.fillPosts();
blogPosts.avgRatingSort();
blogPosts.render('blog-1_section');

//============ < КОД ============//



// const BLOG_URL = 'https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts';
// const blogPosts = new Blog(BLOG_URL);
// blogPosts.avgRatingSort();
// blogPosts.render('blog-1_section');