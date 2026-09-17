export {};

type Identified = {
	id: number;
};

type Timestamped = {
	createdAt: Date;
};

class Container<T extends object> {
	private readonly items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	remove(index: number): T | undefined {
		if (index < 0 || index >= this.items.length) {
			return undefined;
		}

		return this.items.splice(index, 1)[0];
	}

	list(): T[] {
		return [...this.items];
	}
}

interface Response<T> {
	status: number;
	data: T;
}

function parseResponse<T>(response: Response<unknown>): T {
	return response.data as T;
}

class Repository<T> {
	private readonly items: T[] = [];

	add(item: T): void {
		this.items.push(item);
	}

	retrieve(index: number): T | undefined {
		return this.items[index] as T | undefined;
	}

	list(): T[] {
		return [...this.items];
	}
}

type RecordWithMetadata = Identified & Timestamped;

const container = new Container<RecordWithMetadata>();
container.add({ id: 1, createdAt: new Date() });

const response: Response<unknown> = {
	status: 200,
	data: { name: "Alex", score: 100 },
};
const parsedResponse = parseResponse<{ name: string; score: number }>(response);

const repository = new Repository<string>();
repository.add("first item");

console.log(container.list());
console.log(container.remove(0));
console.log(parsedResponse.name, parsedResponse.score);
console.log(repository.retrieve(0));
console.log(repository.list());
