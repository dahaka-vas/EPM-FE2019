import AbstractRenderer from '../absractClasses/AbstractRenderer';
import BlogPostData from '../interfaces/BlogPostData';

class BlogRenderer extends AbstractRenderer implements BlogPostData {

    url: string = 'https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts';
    get dataFromServer (): any {
        return fetch(this.url)
        .then(response => response.json())
        .catch((error) => alert('Данные с сервера не загружены\n\n' + error));
    }

    set dataFromServer (_url) {
        this.url = _url;
    }

    private avgRatingSort (): any {
        return this.dataFromServer
        .then((posts: any[]) => {
            const maxRate:number = 1e3;        // максимальная оценка в рейтингах
            const avgRating = (r: number[]) => {
                return Math.floor (r.reduce((sum, current) => sum + current) / r.length) * (10 / maxRate);
            }
            posts.map((item: { avgRating: number; }, i: number) => item.avgRating = avgRating (posts[i].ratings));
            posts.sort((a: { avgRating: number; }, b: { avgRating: number; }) => b.avgRating - a.avgRating);
            return posts;
        })
        .catch((error: any) => alert('Невозможно найти данные рейтинга\n\n' + error));
    }

    render (selector: string, RENDER_COL: number = 3): void {     // RENDER_COL = количество выводимых статей в блоке
        this.avgRatingSort ()
        .then((posts: any[]) => {
            posts.slice(0, RENDER_COL).forEach((item: any, i: number) => {
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
        .catch((error: any) => alert(error));
    }
}

const blogPosts = new BlogRenderer();
// blogPosts.dataFromServer=0;
export default blogPosts;