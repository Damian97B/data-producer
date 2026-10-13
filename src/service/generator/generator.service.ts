import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { GaussianDataGenerator } from '../../engine/generator/gaussian-data-generator.js';
import { DataGenerator } from '../../engine/generator/data-generator.js';
import { ArbitraryDataGenerator } from '../../engine/generator/arbitrary-data-generator.js';

@Injectable()
export class GeneratorService {
    private activeGenerator: DataGenerator = new GaussianDataGenerator(1, 1);

    useGaussian(mean: number, std: number): void {
        this.activeGenerator = new GaussianDataGenerator(mean, std);
    }

    useArbitrary(value: number): void {
        this.activeGenerator = new ArbitraryDataGenerator(value);
    }

    generate(): number {
        return this.activeGenerator.generate();
    }
}
