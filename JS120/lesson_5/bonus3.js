/*
Requirements
1. If human has 2 squares in a row with unused
square then computer should claim unused square
2. If no immediate threat do random sqaures.

Algorithm

2. Grab all human choices from squares object
2.1 Use Object entries method
2.2 Use filter method with each 1st index element
invoke a method that returns if human X
2.3 return 0th index of each array element only
3. Create nested array of potential 2 entries
3.1
initialise empty array
loop over array using for loop

For each array element in possibile winning
is the slice (0,2)
slice (1)
push these combinations to the new array

4. Create a function that tests whether the human moves array contains any
of the winning combos
Using reduce
check if the element is included in the array
then add one
if not then return the accumulator
return if the retruned number is eqaul to 2

*/