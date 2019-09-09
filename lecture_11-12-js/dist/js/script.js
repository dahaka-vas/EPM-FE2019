function getRandom (min, max) {
        return Math.floor (Math.random() * (max - min + 1)) + min;
    }

function avgRating (r) {
    r = Math.floor (r.reduce ((sum, current) => sum + current) / 100) / 10;
    return r;
}

function Blog () {
    const   topicsNum = 20,     // общее количество топиков (тегов)
            postsNum = 30,      // общее количество постов
            ratingsNum = 10,    // количество оценок
            maxRate = 1e3,      // максимальная оценка
            minRate = 1;        // минимальная оценка

    const topics = new Array(topicsNum).fill(null).map((item, i) => '#topic' + (i+1));

    this.posts = new Array(postsNum).fill(null).map((item, i) => {
        return {
            id: i+1,
            ratings: new Array(ratingsNum).fill(null).map(() => getRandom(minRate, maxRate)),
            topics: topics.sort(() => Math.random() - 0.5).slice(0, getRandom(1, topicsNum)),
            title: 'Title ' + (i+1)
        }
    });
}

function Renderable () {}

Object.assign(Renderable.prototype, {
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
        });
    }
})

Object.assign(Blog.prototype, Renderable.prototype);

const blog1 = new Blog();
blog1.avgRatingSort();
blog1.render('blog-1_section');
const blog2 = new Blog();
blog2.avgRatingSort();
blog2.render('blog-2_section');
