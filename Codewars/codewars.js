/* Written Problem
Write a function that accepts an array of 10 integers (between 0 and 9), that returns a string of those numbers in the form of a phone number.

Example:
createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"

The returned format must be correct in order to complete this challenge.
Don't forget the space after the closing parentheses!

*/

/*
Problem 

Input: array of 10 positive integers between 0 - 9 
output: string of digits in the form of a phone number 
A space between the first group of digits and second group of digits
First three digits have a bracket round it
The next three digits have hyphenated with four digits

Explicit requirements
1. A function created with one argument
2. The function accepts an array of positive integers 10 
3. Returns a string of those numbers in the form of a phone number
3.1 The first three digits have ( before and after )
3.2 A space 
3.3 Three digits without spaces
3.4 Hyphen
3.5 Four digits 

Examples 
Simple 
createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
createPhoneNumber([0,0,0,0,0,0,0,0,0,0]) // (000) 000-000

Edge Cases
createPhoneNumber([])
createPhoneNumber([0,0,0,0,0,0,0,0,0,0,0])
createPhoneNumber([9,9,9,9,9,9,9,9,9,9,9])


Failures
createPhoneNumber([10,0,0,0,0,0,0,0,0,0])
createPhoneNumber([-1,0,0,0,0,0,-3,0,0])
createPhoneNumbe([0,'',0,0,0,0,0,0,0,0,])
createPhoneNumber([0,,0,0,0,0,0,0,0,0,0])

Data Structures
1. Possible regex 
2. Looping through array
3. Arrays and Array methods

Algorithms 
High level 
1. Function to create first three digits in string format ()
2. Function to create second and third group of digits with a hyphen inbetween
3. Return concatenated strings

Validation Aspects to consider
1. Check that array is array 
2. Check that numbers are between 0 and 9 only
3. Check that the array contains 9 elements 
4. Check that there are no unset elements 

Specific

Non-regex solution 

function three digits
1. Create a variable and assign it the argument string and using the slice method invocation start at 0 and end at index 3 and
2. Use the join method invocation with seperate empty string
3. Return string using template literals inserting the variable inbetween ( )

Function for second and third group
1. Create a variable  and assign it the argument string and slice method invocation start at 3 and end at 6 
2. Use join method invocation with seperator of an empty sring

3. Creating a variable and assigning it the argument string and slice method invocation start at 6 and end at 10 
4. Use the join method invocation with the seperator of an empty string 
5. return template literal with a hyphen between each variable

function 
1. Call three digit function 
2 call second and third group function
3. return these two concatenated with a space

Regex solution

1. Convert the argument array into a string of numbers using the join method invocation
2. Using the replace method invocation to create a new string of desired output structure
2.1 Using regex capture groups and replacement patterns 
2.2 regex (\d\d\d) (\d\d\d)-(\d\d\d\d)
2.3 replacement pattern ($1) $2-$3
2.4 Return the result of the method chaining 

/*

Alternative Solution

function createPhoneNumber(numbers){
 return `${firstGroup(numbers)} ${lastGroup(numbers)}`;
}

function firstGroup(numbers) {
 let firstGroup = numbers.slice(0,3).join('');
 return `(${firstGroup})`;
}

function lastGroup(numbers) {
 let secondGroup = numbers.slice(3,6).join('');
 let thirdGroup = numbers.slice(6,10).join('');
 return `${secondGroup}-${thirdGroup}`;
}
*/

function createPhoneNumber(numbers) {
  return numbers.join('').replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1) $2-$3');
}