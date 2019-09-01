function getRandom (min, max) {
    return Math.floor (Math.random() * (max - min + 1)) + min;
}

class BlogData {
    constructor() {
        const   topicsNum = 20,     // общее количество топиков (тегов)
                postsNum = 30,      // общее количество постов
                ratingsNum = 10,    // количество оценок
                maxRate = 1e3,      // максимальная оценка
                minRate = 1;        // минимальная оценка

        const topics = new Array(topicsNum).fill(null).map((item, i) => '#topic' + (i + 1));

        this.posts = new Array(postsNum).fill(null).map((item, i) => {
            return {
                id: i + 1,
                ratings: new Array(ratingsNum).fill(null).map(() => getRandom(minRate, maxRate)),
                topics: topics.sort(() => Math.random() - 0.5).slice(0, getRandom(1, topicsNum)),
                title: 'Title ' + (i + 1)
            };
        });
    }
}

class Blog extends BlogData {
    render(selector) {
        const blogCol = 3;        // количество выводимых статей в блоке Blog

        function avgRating(r) {
            r = Math.floor(r.reduce((sum, current) => sum + current) / 100) / 10;
            return r;
        }

        // this.posts.map((item, i) => Object.assign(item, { avgRating: avgRating(this.posts[i].ratings) }));
        this.posts.map((item, i) => item.avgRating = avgRating(this.posts[i].ratings));
        this.posts.sort((a, b) => b.avgRating - a.avgRating);

        this.posts.slice(0, blogCol).forEach((item, i) => {
            const renderTopic = document.createElement('div');
            renderTopic.innerHTML = '<span class="badge badge-secondary">' +
                                     item.topics.join('</span> <span class="badge badge-secondary">') +
                                     '</span>';

            document.querySelectorAll('.' + selector + ' > .blog_h3')[i].innerHTML = item.title;
            document.querySelectorAll('.' + selector + ' > .rating')[i].innerHTML = 'Rating: ' + item.avgRating.toFixed(1);
            document.querySelectorAll('.' + selector + ' > .topics')[i].append(renderTopic);
        });
    }
};

new Blog().render('blog-1_section');
new Blog().render('blog-2_section');
// console.log (new Blog());
// console.log (new Blog().posts);
// console.log (new Blog().render('blog-1_section'));