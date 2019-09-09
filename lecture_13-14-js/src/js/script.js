function getRandom (min, max) {
    return Math.floor (Math.random() * (max - min + 1)) + min;
}

function avgRating (r) {
    r = Math.floor (r.reduce((sum, current) => sum + current) / 100) / 10;
    return r;
}

function Renderable (data) {
    _data = data;
    this.data = _data;

    this.avgRatingSort = function () {
        _data.map((item, i) => item.avgRating = avgRating (_data[i].ratings));
        _data.sort((a, b) => b.avgRating - a.avgRating);
    }

    this.render = function (selector, renderCol = 3) {
        _data.slice(0, renderCol).forEach((item, i) => {
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

    return this;
}

function Blog (data) {
    Blog.prototype = Renderable(data);
}


// console.log (new Blog([1,2,3]));
// console.log (new Blog([1,2,3]).data);
// console.log (new Blog([1,2,3]).dat);


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
.then(data => data)
.then(data => {
    console.log(data);
    const _data = new Blog(data);
    console.log(_data.data);
    _data.avgRatingSort();
    _data.render('blog-1_section');
});