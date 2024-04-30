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
  
  function parseVisitorsListAndSayHello (arr){
    var k,
      item,
      parsedArary = [], // Typo
      length = arr.length;
  
    var arr2 = [];
  
    for (k = 0; k < length; k++) {
      if (arr[k] instanceof Array) {
        for (
          var j = 0;
          j < arr[k].length;
          j++
        ) {
          if (
            arr[k][j] !== null &&
            arr[k][j] !== ""
          ) {
            arr2.push(arr[k][j]);
          }
        }
      } else if (arr[k] !== null && arr[k] !== "") {
        arr2.push(arr[k]);
      }
    }
  
    for (k = 0; k < arr2.length; k++) {
      item = arr2[k];
  
      const name = item.split(" ")[0];
      parsedArary.push(name);
    }
    
    for (k = 0; k < parsedArary.length; k++) {
      item = parsedArary[k];
  
     console.log("Hello " + item + " !")
    }
    
  };
  
  parseVisitorsListAndSayHello(usersArrayList);