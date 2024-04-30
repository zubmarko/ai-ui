// Prompt:
// change code style to declarative style

const usersArrayList = [
    undefined,
    false,
    [null],
    ["Serj Potter"],
    null,
    [],
    "Batman",
    "Tommy",
    "",
    ["John Doe", "Elon Task"], // Nested array
  ];
  
  function parseVisitorsListAndSayHello(arr) {
    const nonEmptyNames = arr
      .flatMap(item => (Array.isArray(item) ? item : [item])) // Flatten and handle single items
      .filter(name => name) // Remove null, undefined, false, and empty strings
      .map(fullName => fullName.split(" ")[0]) // Extract first names
      .forEach(name => console.log(`Hello ${name} !`)); // Greet each visitor
  }
  
  parseVisitorsListAndSayHello(usersArrayList);
  