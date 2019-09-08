function getRandom (min, max) {
    return Math.floor (Math.random() * (max - min + 1)) + min;
}

function render (data, selector, blogCol = 3) {
    // blogCol = количество выводимых статей в блоке Blog

    data.map((item, i) => item.avgRating = avgRating(data[i].ratings));
    data.sort ((a, b) => b.avgRating - a.avgRating);

    function avgRating (r) {
        r = Math.floor (r.reduce ((sum, current) => sum + current) / 100) / 10;
        return r;
    }

    data.slice(0, blogCol).forEach ((item, i) => {
        const renderTopics = document.createElement('div');
        renderTopics.innerHTML = '<span class="badge badge-secondary">' +
                                item.topics.join('</span> <span class="badge badge-secondary">') +
                                '</span>';
        document.querySelectorAll ('.' + selector + ' > .blog_h3')[i].innerHTML = item.title;
        document.querySelectorAll ('.' + selector + ' > .rating')[i].innerHTML = 'Rating: ' + item.avgRating.toFixed(1);
        document.querySelectorAll ('.' + selector + ' > .topics')[i].append(renderTopics);
    });
}

const posts = fetch('https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts')
.then(response => response.json())
.then(data => render(data, 'blog-1_section'))
.catch(error => alert(error));