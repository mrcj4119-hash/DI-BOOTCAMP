import random


class Gene:
    def __init__(self, value=None):
        self.value = random.randint(0, 1) if value is None else value

    def mutate(self):
        self.value = 1 - self.value

    def __str__(self):
        return str(self.value)


class Chromosome:
    def __init__(self, genes=None):
        self.genes = genes or [Gene() for _ in range(10)]

    def mutate(self):
        number_to_mutate = random.randint(1, len(self.genes))
        selected_genes = random.sample(self.genes, number_to_mutate)

        for gene in selected_genes:
            if random.choice([True, False]):
                gene.mutate()

    def __str__(self):
        return "".join(str(gene) for gene in self.genes)


class DNA:
    def __init__(self, chromosomes=None):
        self.chromosomes = chromosomes or [Chromosome() for _ in range(10)]

    def mutate(self):
        number_to_mutate = random.randint(1, len(self.chromosomes))
        selected_chromosomes = random.sample(
            self.chromosomes,
            number_to_mutate,
        )

        for chromosome in selected_chromosomes:
            chromosome.mutate()

    def is_all_ones(self):
        return all(
            gene.value == 1
            for chromosome in self.chromosomes
            for gene in chromosome.genes
        )

    def __str__(self):
        return "\n".join(str(chromosome) for chromosome in self.chromosomes)


class Organism:
    def __init__(self, dna, environment):
        self.dna = dna
        self.environment = environment

    def mutate(self):
        if random.random() < self.environment:
            self.dna.mutate()

    def has_perfect_dna(self):
        return self.dna.is_all_ones()

organisms = [
    Organism(DNA(), environment=0.1)
    for _ in range(20)
]

generation = 0

while True:
    generation += 1

    for organism in organisms:
        organism.mutate()

        if organism.has_perfect_dna():
            print(f"Perfect DNA found after {generation} generations.")
            print(organism.dna)
            break
    else:
        continue

    break