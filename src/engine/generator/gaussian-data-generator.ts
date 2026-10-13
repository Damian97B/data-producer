import type { DataGenerator } from './data-generator.js';

export class GaussianDataGenerator implements DataGenerator {
  constructor(
    private readonly mean: number,
    private readonly std: number,
  ) {}

  generate(): number {
    let u1 = Math.random();
    let u2 = Math.random();

    while (u1 === 0) {
        u1 = Math.random();
    }
    while (u2 === 0) {
        u2 = Math.random();
    }
    const standardNormal = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

    return Number((this.mean + this.std * standardNormal).toFixed(2));
  }
}
