// function getRandom (min, max) {
//     return Math.floor (Math.random() * (max - min + 1)) + min;
// }

const URL = {blog: 'https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts'};

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

function Blog () {
    // this.posts = getDataFromServerApi(BLOG_URL)
}


//============ ГЕТТЕР ============//
Blog.prototype = {
    get posts () {
        // async function api() {
        //     return await getDataFromServerApi(BLOG_URL);
        // }
        // const a = api();
        // return a;
        return getDataFromServerApi(URL.blog);
    }
}

// Object.defineProperty(Blog, 'posts', {
//     get () {
//         // const n = new GetDataFromServerApi(this.url);
//         // console.log(n);
//         return getDataFromServerApi(URL.blog);
//     }
// });
//============ ГЕТТЕР ============//

Object.assign(Blog.prototype, Renderable.prototype, {
    avgRatingSort () {
        this.posts.then(async (data) => {
            data.map((item, i) => item.avgRating = avgRating (data[i].ratings));
            data.sort((a, b) => b.avgRating - a.avgRating);
        })
    },

    render (selector, RENDER_COL = 3) {
        // RENDER_COL = количество выводимых статей в блоке
        this.posts.then(async (data) => {
            // data.map((item, i) => item.avgRating = avgRating (data[i].ratings));
            // data.sort((a, b) => b.avgRating - a.avgRating);
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
})

 function getDataFromServerApi (url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => alert(error));
}

// GetDataFromServerApi.prototype = {
//     get data () {
//         const n = async() => {
//         const a = fetch(url)
//         .then(response => response.json())
//         // .then(data => console.log(data))
//         .catch(error => alert(error));
//         // console.log(this.data);
//         return await a;
//         }
//         return n;
//     }
// }

// const blogPosts = getDataFromServerApi('https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts')
// .then(data => {
//     posts = new Blog(data);
//     posts.avgRatingSort();
//     posts.render('blog-1_section');
// })
// .catch(error => {
//     alert(error);
// });

const blogPosts = new Blog();
// console.log(blogPosts.posts);

blogPosts.avgRatingSort();
blogPosts.render('blog-1_section');