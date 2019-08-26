function getRandom (min, max) {
    return Math.floor (Math.random() * max) + min;
}

function getArray (length, fn) {
    let newArr=[];
    for (let i=1; i<=length; i++) {
        newArr.push (fn(i));
    }
    return newArr;
}

const topics = getArray(20, function (i) {
    return '#topic' + i;
});

function getTopicArray (length, arr) {
    let newArr=[];
    let l=length;
    for (let i=0; i<length; i++, l--) {
        newArr = newArr.concat (arr.splice (getRandom(1, l), 1));
    }
    return newArr;
}

const posts = getArray (30, function (i) {
    return {
        id: i,
        ratings: getArray(10, function () {
            return getRandom (1, 1e3);
        }),
        topics: getTopicArray (getRandom(1, 20), topics.slice()),
        title: 'Title ' + i
    };
});

function avgRating (r) {
    r = Math.floor (r.reduce (function (sum, current) {
        return sum + current;
    }) / 100) / 10;
    return r;
}

posts.sort (function (a, b) {
    return avgRating(b.ratings) - avgRating(a.ratings);
});

posts.slice(0, 3).forEach (function (item, i) {
    document.querySelectorAll ('.blog_section > .blog_h3')[i].innerHTML = item.title;
    document.querySelectorAll ('.blog_section > .rating')[i].innerHTML = 'Rating: ' + avgRating(item.ratings).toFixed(1);
    document.querySelectorAll ('.blog_section > .topics')[i].innerHTML = '<span class="badge badge-secondary">' +
                                                                        item.topics.join('</span> <span class="badge badge-secondary">') + '</span>';
});