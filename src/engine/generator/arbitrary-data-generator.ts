import type { DataGenerator } from './data-generator.js';

export class ArbitraryDataGenerator implements DataGenerator {
  constructor(private readonly value: number) {}

  generate(): number {
    return this.value;
  }
}