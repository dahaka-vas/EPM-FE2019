// function getRandom (min, max) {
//     return Math.floor (Math.random() * (max - min + 1)) + min;
// }

const BLOG_URL = 'https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts';

function avgRating (r) {
    r = Math.floor (r.reduce((sum, current) => sum + current) / 100) / 10;
    return r;
}

function Renderable () {}

Object.assign(Renderable.prototype, {
    render() {
        throw new Error('Метода Render не существует')
    }
})

function Blog (url) {
    this.url = url;
}

//============ ГЕТТЕР ============//
Blog.prototype = {
    get posts () {
        return GetDataFromServerApi (this.url)
    }
};

Object.defineProperty(Blog, 'posts', {
    get posts () {
        return GetDataFromServerApi (this.url)
    }
});
//============ ГЕТТЕР ============//

Object.assign(Blog.prototype, Renderable.prototype, {
    avgRatingSort () {
        this.posts.map((item, i) => item.avgRating = avgRating (this.posts[i].ratings));
        this.posts.sort((a, b) => b.avgRating - a.avgRating);
    },

    render (selector, RENDER_COL = 3) {
        // RENDER_COL = количество выводимых статей в блоке
        this.posts.slice(0, RENDER_COL).forEach((item, i) => {
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
    }
})

async function GetDataFromServerApi (url) {
    data = fetch(url)
    .then(response => response.json())
    // .then(data => console.log(data))
    .catch(error => alert(error));
    // console.log(this.data);
    return await data;
}

// const blogPosts = getDataFromServerApi('https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts')
// .then(data => {
//     posts = new Blog(data);
//     posts.avgRatingSort();
//     posts.render('blog-1_section');
// })
// .catch(error => {
//     alert(error);
// });

const blogPosts = new Blog(BLOG_URL);
// blogPosts.then(data => console.log('ff' + data) );
console.log(blogPosts);

// blogPosts.avgRatingSort();
// blogPosts.render('blog-1_section');