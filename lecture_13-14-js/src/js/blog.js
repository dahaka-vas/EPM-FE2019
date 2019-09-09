function getRandom (min, max) {
    return Math.floor (Math.random() * (max - min + 1)) + min;
}

function render (data, selector, renderCol = 3) {
    // renderCol = количество выводимых статей в блоке

    _data = data;
    _data.map((item, i) => item.avgRating = avgRating (_data[i].ratings));
    _data.sort((a, b) => b.avgRating - a.avgRating);

    function avgRating (r) {
        r = Math.floor (r.reduce((sum, current) => sum + current) / 100) / 10;
        return r;
    }

    _data.slice(0, renderCol).forEach((item, i) => {
        const renderTopics = document.createElement('div');
        renderTopics.innerHTML = '<span class="badge badge-secondary">' +
                                item.topics.join('</span> <span class="badge badge-secondary">') +
                                '</span>';
        document.querySelectorAll ('.' + selector + ' > .blog_h3')[i].innerHTML = item.title;
        document.querySelectorAll ('.' + selector + ' > .rating')[i].innerHTML = 'Rating: ' + item.avgRating.toFixed(1);
        document.querySelectorAll ('.' + selector + ' > .topics')[i].append(renderTopics);
    });
}

// function getDataFromServerApi (url, selector) {
//     fetch(url)
//     .then(response => response.json())
//     .then(data => render(data, selector))
//     .catch(error => alert(error));
// }
// const blogPosts = getDataFromServerApi ('https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts', 'blog-1_section');

function getDataFromServerApi (url,) {
    data = fetch(url)
    .then(response => response.json())
    .catch(error => alert(error));
    return data;
}

const blogPosts = getDataFromServerApi('https://my-json-server.typicode.com/dahaka-vas/EPM-FE2019/posts')
.then(data => render (data, 'blog-1_section'));
