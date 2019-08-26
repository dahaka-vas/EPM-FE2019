const posts=[];

function getRandom (max) {
    return Math.floor (Math.random() * max) + 1;
}

// function getArray (length, element) {
//     let arr=[];
//     for (let i=1; i<length; i++) {
//         arr.push (element);
//     }
//     return arr;
// }

function getRatingsArray () {
    let arr=[];
    for (let i=1; i<=10; i++) {
        arr.push (getRandom (1000));
    }
    return arr;
}

function getTopicsArray () {
    let arr=[];
    for (let i=1; i<=getRandom(20); i++) {
        arr.push ('#topic' + i);
    }
    return arr;
}

for (let i=1; i<=30; i++) {
    posts.push ( {
        Id: i,
        // Ratings: getArray (10, getRandom (1000)),
        // Topics: getArray (getRandom(20), ('#topic' + i)),
        Ratings: getRatingsArray (),
        Topics: getTopicsArray (),
        Title: 'Title ' + i
        }
    );
}

function avgRating (r) {
    r = Math.floor (r.reduce (function (sum, current) {
        return sum + current;
    }) / 100) / 10;
    return r;
}

posts.sort (function (a, b) {
    return avgRating(b.Ratings) - avgRating(a.Ratings);
}
);

for (let i=0; i<3; i++) {
    document.querySelectorAll ('.blog_section > h3')[i].innerHTML = posts[i].Title;
    document.querySelectorAll ('.blog_section > .rating')[i].innerHTML = 'Rating: ' + avgRating(posts[i].Ratings);
    document.querySelectorAll ('.blog_section > .topics')[i].innerHTML = posts[i].Topics.join(' ');
}