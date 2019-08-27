// const strArray = ['JavaScript', 'Python', 'PHP', 'Java', 'C'];

// function mapForEach(arr, fn) {
//     const newArray = [];
//     for(let i = 0; i < arr.length; i++) {
//         newArray.push (fn(arr[i]));
//     }
//     return newArray;
// }

// const lenArray = mapForEach(strArray, function(item) {
//                                         return item.length;
//                                         });

// prints [ 10, 6, 3, 4, 1 ]
// console.log(lenArray);


////-------------------------------////
// function getArray (length, fn) {
//     let newArr=[];
//     for (let i=1; i<=length; i++) {
//         newArr.push (fn(i));
//     }
//     return newArr;
// }


// const post = getArray (30, function (i) {
//     // const newObj = {};
//     // console.log (newObj);
//     return {
//         id: i,
//         ratings: getArray(10, function () {
//             return getRandom (1, 1e3);
//         }),
//         topics: getTopicArray (getRandom(1, 20), topics.slice()),
//         title: 'Title ' + i
//     };
// });

// console.log (post);

// for (let i=1; i<=30; i++) {
//     posts.push ({
//         id: i,
//         ratings: getArray(10, function () {
//             return getRandom (1, 1e3);
//         }),
//         topics: getTopicArray (getRandom(1, 20), topics.slice()),
//         title: 'Title ' + i
//     });
// }

//------------------------------//

// const posts=[];

// for (let i=1; i<=30; i++) {
//     posts.push ({
//         id: i,
//         ratings: getArray(10, function () {
//             return getRandom (1, 1e3);
//         }),
//         topics: getTopicArray (getRandom(1, 20), topics.slice()),
//         title: 'Title ' + i
//     });
// }

// function getRandom (min, max) {
//     return Math.floor (Math.random() * max) + min;
// }

// const rate = new Array(10).fill(null).map(() => getRandom(1, 1e3));
const topic = new Array(20).fill(null).map((item, i) => '#topic' + (i+1));
const post = new Array(30).fill(null).map(function(item, i) {
    return {
    id: i+1,
    ratings: new Array(10).fill(null).map(() => getRandom(1, 1e3)),
    // topics: getTopicArray (getRandom(1, 20), topic.slice()),
    topic: topic.sort(() => Math.random() - 0.5).slice(0,3),
    title: 'Title ' + (i+1)
    }
});

// clonePost = Object.assign ({}, {});
// console.log (post[1].ratings);
// clonePost = Object.assign (post, {avgRating: avgRating(post.ratings)});

post.map ((item, i) => Object.assign (item, {avgRating: avgRating(post[i].ratings)}))


post.sort (function (a, b) {
    return b.avgRating - a.avgRating;
});

console.log (post);
console.log (posts);