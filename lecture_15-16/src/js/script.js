// function getRandom (min, max) {
//     return Math.floor (Math.random() * (max - min + 1)) + min;
// }

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

function Blog (posts) {
    this.posts = posts;
}

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

function getDataFromServerApi (url) {
    data = fetch(url)
    .then(response => response.json())
    .catch(error => alert(error));
    return data;
}

const blogPosts = getDataFromServerApi('https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts')
.then(data => {
    posts = new Blog(data);
    posts.avgRatingSort();
    posts.render('blog-1_section');
})
.catch(error => {
    alert(error);
});