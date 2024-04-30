// Prompt:
// optimize performance and I would prefer to use recursion in one function to flat array and filter empty values
// and separate function to log names and say hello
// Function to flatten an array and filter out empty values using recursion

function flattenAndFilter(array) {
    let result = [];
    for (let item of array) {
        if (Array.isArray(item)) {
            result = result.concat(flattenAndFilter(item)); // Recursive call
        } else if (item) {
            result.push(item); // Only add items that are not empty
        }
    }
    return result;
}

// Function to log names and say hello
function logNamesAndGreet(names) {
    names.forEach(name => {
        console.log(`Hello, ${name}!`); // Greet each name
    });
}

// Example usage
const nestedArray = [1, [2, [3, [4, '']], 5], 6, null, ['Hello', ['World']]];
const filteredFlattenedArray = flattenAndFilter(nestedArray);
console.log('Filtered and Flattened Array:', filteredFlattenedArray); // Logs the processed array

const names = ['Alice', 'Bob', 'Charlie'];
logNamesAndGreet(names); // Greets each name
