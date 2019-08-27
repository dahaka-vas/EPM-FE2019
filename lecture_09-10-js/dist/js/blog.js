var blogCol = 3,        // количество выводимых статей в блоке Blog
    topicsNum = 20,     // общее количество топиков (тегов)
    postsNum = 30,      // общее количество постов
    ratingsNum = 10     // количество оценок
;

function getRandom (min, max) {
    return Math.floor (Math.random() * (max - min)) + min;
}

function avgRating (r) {
    r = Math.floor (r.reduce ((sum, current) => sum + current) / 100) / 10;
    return r;
}

const topics = new Array(topicsNum).fill(null).map((item, i) => '#topic' + (i+1));
const posts = new Array(postsNum).fill(null).map(function(item, i) {
    return {
    id: i+1,
    ratings: new Array(ratingsNum).fill(null).map(() => getRandom(1, 1e3)),
    topics: topics.sort(() => Math.random() - 0.5).slice(0, getRandom(1, topicsNum)),
    title: 'Title ' + (i+1)
    }
});

function drawingBlog () {
    posts.map ((item, i) => Object.assign (item, {avgRating: avgRating(posts[i].ratings)}));

    posts.sort ((a, b) => b.avgRating - a.avgRating);

    posts.slice(0, blogCol).forEach (function (item, i) {
        document.querySelectorAll ('.blog_section > .blog_h3')[i].innerHTML = item.title;
        document.querySelectorAll ('.blog_section > .rating')[i].innerHTML = 'Rating: ' + item.avgRating.toFixed(1);
        document.querySelectorAll ('.blog_section > .topics')[i].innerHTML = '<span class="badge badge-secondary">' +
                                                                            item.topics.join('</span> <span class="badge badge-secondary">') + '</span>';
    });
}

drawingBlog ();
// console.log (posts);