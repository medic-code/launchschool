/*

Problem
input: array and strings to add
output: string with added tsrings
Explicit requiremets
1. Write a funciton that passes in an array
of integers and delimiters
2. Return a string based on the addition of
delimtiers
2.1 If the array is length 2 -> 1 or 2
2.2 if the array is length 3 or more -> 1,2, or 3
2.3 if the array is length 3 and ;, 1; 2; or 3
2.4 if the array length is 3 and two delimiters
-> 1,2, and 3;


obj.joinOr([1, 2])                   # => "1 or 2"
obj.joinOr([1, 2, 3])                # => "1, 2, or 3"
obj.joinOr([1, 2, 3], '; ')          # => "1; 2; or 3"
obj.joinOr([1, 2, 3], ', ', 'and')   # => "1, 2, and 3"

Data Structures and Algorithms
1. Arrays and strings
2. Join method

High level
1. Extract all but one array elements
2. Extract last element
3. Extract 2nd to last arguments

2. join array elements between specific seperator
4. Invoke join method on all but one array
using second argument seperator
5. Add third argument to last element as a string


*/

function joinOr(array,delimiter = ', ', option = 'or') {
  if (array.length === 2) {
    return array.join(` ${option} `);
  }
  let firstPart = array.slice(0,-1).join(delimiter);
  let lastPart = `${delimiter}${option} ${array.slice(-1).join('')}`;
  return firstPart + lastPart;
}

console.log(joinOr([1, 2, 3], ', ', 'and'));