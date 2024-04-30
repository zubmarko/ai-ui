// Prompt:
// use best practices of JS

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
    const filteredNames = arr.flatMap(item => {
      if (Array.isArray(item)) {
        return item.filter(subItem => subItem !== null && subItem !== "");
      } else if (item !== null && item !== "") {
        return item;
      }
    }).map(fullName => fullName.split(" ")[0]);
  
    filteredNames.forEach(name => console.log(`Hello ${name}!`));
  }
  
  parseVisitorsListAndSayHello(usersArrayList);
  