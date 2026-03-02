//sum of all numbers in the array
let num = [1, 2, 3, 4, 5];
let sum = num.reduce((acc, curr) => acc + curr, 0);
console.log(sum);


//Add a new number to the end of the array
num.push(6);
console.log(num);
// Output: [1, 2, 3, 4, 5, 6]


//Remove the first number from the array
num.shift();
console.log(num);


//Reverse the array
num.reverse();
console.log(num);


//Check if a specific number exists in the array
let target = 9;
let fin = num.filter(num => num == target)
if (fin.length > 0) {
    ch = true;
    console.log("number exist", ch)
}
else {
    ch = false;
    console.log("number not exist", ch)
}

//Create a new array with each number multiplied by 2 using map
let doublednum = num.map(function (num) {
    return num * 2;
});
const doublednumarrow = num.map(num => num * 2);
console.log(doublednumarrow);


//Use filter() to find all numbers greater than 3
num.reverse();
let filterednum = num.filter(num => num > 3);
console.log(filterednum);


//Use find() to get the first number that is divisible by 2
let firstdivisibleBy2 = num.find(num => num % 2 === 0);
console.log(firstdivisibleBy2);