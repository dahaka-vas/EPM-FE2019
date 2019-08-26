function getRandom (min, max) {
    return Math.floor (Math.random() * max) + min;
}

function getRatingArray () {
    let arr=[];
    for (let i=1; i<=10; i++) {
        arr.push (getRandom (1, 1000));
    }
    return arr;
}

function getArray () {
    let arr=[];
    for (let i=1; i<=20; i++) {
        arr.push ('#topic' + i);
    }
    return arr;
}

const topics = getArray ();
const posts=[];

function getTopicArray (length, arr) {
    let newArr=[];
    let l=length;
    for (let i=0; i<length; i++, l--) {
        newArr = newArr.concat (arr.splice (getRandom(1, l), 1));
    }
    return newArr;
}

for (let i=1; i<=30; i++) {
    posts.push ({
        id: i,
        ratings: getRatingArray (),
        topics: getTopicArray (getRandom(1, 20), topics.slice()),
        title: 'Title ' + i
    });
}

function avgRating (r) {
    r = Math.floor (r.reduce (function (sum, current) {
        return sum + current;
    }) / 100) / 10;
    return r;
}

posts.sort (function (a, b) {
    return avgRating(b.ratings) - avgRating(a.ratings);
});

// for (let i=0; i<3; i++) {
//     document.querySelectorAll ('.blog_section > .blog_h3')[i].innerHTML = posts[i].title;
//     document.querySelectorAll ('.blog_section > .rating')[i].innerHTML = 'Rating: ' + avgRating(posts[i].ratings);
//     document.querySelectorAll ('.blog_section > .topics')[i].innerHTML = posts[i].topics.join(' ');
// }

function drawing (drawingSelector) {
    posts.slice(0, 3).forEach (function (item, i) {
        document.querySelectorAll (drawingSelector)[i].innerHTML = item.title;
    });
}

drawing ('.blog_section > .blog_h3');