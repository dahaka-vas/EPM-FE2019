function getRandom (min, max) {
    return Math.floor (Math.random() * (max - min + 1)) + min;
}

function avgRating (r) {
    r = Math.floor (r.reduce((sum, current) => sum + current) / 100) / 10;
    return r;
}

//      -----------     //

function Renderable () {}

Object.assign(Renderable.prototype, {
    avgRatingSort () {
        posts.map((item, i) => item.avgRating = avgRating (posts[i].ratings));
        posts.sort((a, b) => b.avgRating - a.avgRating);
    },

    render (selector, renderCol = 3) {
        posts.slice(0, renderCol).forEach((item, i) => {
            const renderTopics = document.createElement('div');
            renderTopics.innerHTML = '<span class="badge badge-secondary">' +
                                    item.topics.join('</span> <span class="badge badge-secondary">') +
                                    '</span>';
            document.querySelectorAll ('.' + selector + ' > .blog_h3')[i].innerHTML = item.title;
            if (item.avgRating) {
                document.querySelectorAll ('.' + selector + ' > .rating')[i].innerHTML = 'Rating: ' + item.avgRating.toFixed(1);
            }
            document.querySelectorAll ('.' + selector + ' > .topics')[i].append(renderTopics);
        });
    }
})

function Blog (posts) {
    this.posts = posts;
}

Object.assign(Blog.prototype, Renderable.prototype);


console.log (new Blog([1,2,3]));

function getDataFromServerApi (url,) {
    data = fetch(url)
    .then(response => response.json())
    .catch(error => alert(error));
    return data;
}

// const blogPosts = getDataFromServerApi('https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts')
// .then(data => {
//     console.log(data);
//     const _data = new Blog(data);
//     console.log(_data.data);
//     _data.avgRatingSort();
//     _data.render('blog-1_section');
// });

const blogPosts = getDataFromServerApi('https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts')
// .then(data => data)
.then(data => {
    console.log(data);
    const _data = new Blog([{"id":1,"ratings":[456,683,11,942,198,911,594,828,631,532],"topics":["#topic2","#topic1","#topic3","#topic5","#topic4","#topic6","#topic8","#topic7","#topic9","#topic13","#topic10","#topic11","#topic14"],"title":"Title 1"},{"id":2,"ratings":[262,895,952,155,158,725,914,33,922,589],"topics":["#topic2","#topic4","#topic1","#topic5","#topic3","#topic8","#topic6","#topic14","#topic10","#topic7","#topic13","#topic9","#topic11","#topic12","#topic19","#topic17","#topic15"],"title":"Title 2"}]);
    console.log(_data.posts);
    var blog=new Blog;
    console.log(blog)
    _data.avgRatingSort();
    _data.render('blog-1_section');
});