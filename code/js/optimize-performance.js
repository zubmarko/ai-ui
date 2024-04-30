const usersArrayList = [
    undefined, false, [null], ["Serj Potter"], null, [],
    "Batman", "Tommy", "", ["John Doe", "Elon Task"]
  ];
  
  function parseVisitorsListAndSayHello(arr) {
    arr.flat(Infinity) // Flatten any level of nested arrays
      .filter(item => typeof item === 'string' && item.trim() !== '') // Filter out non-string or empty values
      .map(item => item.split(" ")[0]) // Extract first name
      .forEach(name => console.log(`Hello ${name}!`)); // Greet each name
  }
  
  parseVisitorsListAndSayHello(usersArrayList);
  