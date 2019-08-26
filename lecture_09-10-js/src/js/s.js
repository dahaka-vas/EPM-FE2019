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
function getArray (length, fn) {
    let newArr=[];
    for (let i=1; i<=length; i++) {
        newArr.push (fn(i));
    }
    return newArr;
}


const post = getArray (30, function (i) {
    // const newObj = {};
    // console.log (newObj);
    return {
        id: i,
        ratings: getArray(10, function () {
            return getRandom (1, 1e3);
        }),
        topics: getTopicArray (getRandom(1, 20), topics.slice()),
        title: 'Title ' + i
    };
});

console.log (post);

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
