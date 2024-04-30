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
    ["John Doe", "Elon Task"],
];

const parseVisitorsListAndSayHello = (arr) => {
    arr
        .flatMap(item => item instanceof Array ? item : [item])  // Flatten the array
        .filter(name => name)  // Filter out null, undefined, and empty strings
        .map(item => item.split(" ")[0])  // Map to first name
        .forEach(name => console.log(`Hello ${name} !`));  // Greet each name
};

parseVisitorsListAndSayHello(usersArrayList);
