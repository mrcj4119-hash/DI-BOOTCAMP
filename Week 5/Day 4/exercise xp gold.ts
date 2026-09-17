export {};

interface User {
	name: string;
	email: string;
}

interface Admin {
	adminLevel: number;
}

type AdminUser = User & Admin;

function getProperty(
	user: AdminUser,
	propertyName: string,
): AdminUser[keyof AdminUser] | undefined {
	if (propertyName in user) {
		return user[propertyName as keyof AdminUser];
	}

	return undefined;
}

type Constructor<T> = new (value?: unknown) => T;

function castToType<T>(value: unknown, constructor: Constructor<T>): T {
	return new constructor(value);
}

function getArrayLength<T extends number | string>(items: T[]): number {
	const typedItems = items as Array<T>;
	return typedItems.length;
}

interface Storage<T> {
	add(item: T): void;
	get(index: number): T | undefined;
}

class Box<T> implements Storage<T> {
	private readonly items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	get(index: number): T | undefined {
		return this.items[index];
	}
}

interface Item<T> {
	value: T;
}

class Queue<T extends Item<unknown>> {
	private readonly items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	remove(): T | undefined {
		return this.items.shift();
	}
}

const adminUser: AdminUser = {
	name: "Alex",
	email: "alex@example.com",
	adminLevel: 2,
};

const convertedNumber = castToType("42", Number);
const convertedBoolean = castToType("true", Boolean);

const numberArrayLength = getArrayLength([1, 2, 3]);
const stringArrayLength = getArrayLength(["one", "two"]);

const numberBox = new Box<number>();
numberBox.add(10);

const stringBox = new Box<string>();
stringBox.add("stored value");

const numberQueue = new Queue<Item<number>>();
numberQueue.add({ value: 100 });

const stringQueue = new Queue<Item<string>>();
stringQueue.add({ value: "queued value" });

console.log(getProperty(adminUser, "name"));
console.log(getProperty(adminUser, "missing"));
console.log(convertedNumber);
console.log(convertedBoolean);
console.log(numberArrayLength);
console.log(stringArrayLength);
console.log(numberBox.get(0));
console.log(stringBox.get(0));
console.log(numberQueue.remove());
console.log(stringQueue.remove());
