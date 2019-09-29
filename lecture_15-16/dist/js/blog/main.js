import blog from '../services/api-service.js';
import RenderService from '../services/render-service.js';

class BlogRenderService extends RenderService {
    fillPosts () {
        return blog
        .then(blog => this.posts = blog);
    }

    avgRatingSort () {
        const maxRate = 1e3;        // максимальная оценка
        const avgRating = (r) => {
            return Math.floor (r.reduce((sum, current) => sum + current) / r.length) * (10 / maxRate);
        }
        this.posts.map((item, i) => item.avgRating = avgRating (this.posts[i].ratings));
        this.posts.sort((a, b) => b.avgRating - a.avgRating);
    }

    render (selector, RENDER_COL = 3) {     // RENDER_COL = количество выводимых статей в блоке
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
}

const blogPosts = new BlogRenderService();
export default blogPosts.fillPosts()
.then(() => {
    blogPosts.avgRatingSort();
    blogPosts.render('blog-1_section');
});