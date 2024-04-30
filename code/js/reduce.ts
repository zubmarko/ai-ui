type Visitor = string | null | boolean | string[] | undefined;

const usersArrayList: Visitor[] = [
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

function parseVisitorsListAndSayHello(arr: Visitor[]): void {
  const parsedArray = arr.reduce<string[]>((acc, item) => {
    if (Array.isArray(item)) {
      const filteredNames = item.filter(name => name !== null && name !== "").map(name => name.split(" ")[0]);
      return acc.concat(filteredNames);
    } else if (typeof item === "string" && item !== "") {
      acc.push(item.split(" ")[0]);
    }
    return acc;
  }, []);

  parsedArray.forEach(name => console.log(`Hello ${name}!`));
}

parseVisitorsListAndSayHello(usersArrayList);
