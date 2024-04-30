// Prompt:
// change code to use es6

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
  
  const parseVisitorsListAndSayHello = (arr) => {
    let parsedArray = []; // Corrected typo
  
    const arr2 = arr.reduce((acc, item) => {
      if (Array.isArray(item)) {
        item.forEach(subItem => {
          if (subItem !== null && subItem !== "") {
            acc.push(subItem);
          }
        });
      } else if (item !== null && item !== "") {
        acc.push(item);
      }
      return acc;
    }, []);
  
    arr2.forEach(item => {
      const [name] = item.split(" ");
      parsedArray.push(name);
    });
  
    parsedArray.forEach(name => {
      console.log(`Hello ${name} !`);
    });
  };
  
  parseVisitorsListAndSayHello(usersArrayList);
  