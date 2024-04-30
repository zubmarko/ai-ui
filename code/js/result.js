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
    const firstNames = arr.flat(Infinity) // Flatten the array to any depth
        .reduce((acc, item) => {
            if (item && typeof item === 'string' && item.trim() !== '') {
                const firstName = item.split(" ")[0];
                acc.push(firstName);
            }
            return acc;
        }, []);

    firstNames.forEach(firstName => console.log(`Hello ${firstName}!`)); // Greet each first name
}

parseVisitorsListAndSayHello(usersArrayList);
