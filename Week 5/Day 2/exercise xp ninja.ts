
type MappedType<T> = T extends number ? number : T extends string ? number : never;

function mapType<T extends number | string>(value: T): MappedType<T> {
  if (typeof value === "number") {
    return (value * value) as MappedType<T>;
  }

  return (value.length) as MappedType<T>;
}

console.log(mapType(4));
console.log(mapType("hello"));


function getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const sampleObject = {
  name: "Alice",
  age: 25,
  city: "Paris"
};

console.log(getProperty(sampleObject, "name"));
console.log(getProperty(sampleObject, "age"));
console.log(getProperty(sampleObject, "city"));


interface HasNumericProperty {
  [key: string]: number;
}

function multiplyProperty<T extends HasNumericProperty, K extends keyof T>(
  obj: T,
  key: K,
  factor: number
): number {
  return obj[key] * factor;
}

const product = {
  price: 10,
  quantity: 4,
  discount: 2
};

console.log(multiplyProperty(product, "price", 3));
console.log(multiplyProperty(product, "quantity", 5));
console.log(multiplyProperty(product, "discount", 4));
