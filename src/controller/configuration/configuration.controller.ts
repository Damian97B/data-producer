import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { GeneratorService } from '../../service/generator/generator.service.js';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Get()
  configure(
    @Query('generator') generator?: string,
    @Query('mean') mean?: string,
    @Query('std') std?: string,
    @Query('value') value?: string,
  ) {
    if (generator === 'gaussian') {
      const parsedMean = this.parseNumber(mean);
      const parsedStd = this.parseNumber(std);
      this.generatorService.useGaussian(parsedMean, parsedStd);

      return {
        generator,
        mean: parsedMean,
        std: parsedStd,
        value: this.generatorService.generate(),
      };
    }

    if (generator === 'arbitrary') {
      const parsedValue = this.parseNumber(value);
      this.generatorService.useArbitrary(parsedValue);

      return { generator, value: parsedValue };
    }

    throw new BadRequestException('generator must be gaussian or arbitrary');
  }
  
  private parseNumber(value?: string): number {
    let parsed: number;
    if (value === undefined || value.trim() === '') {
      throw new BadRequestException(`Value is required`);
    } else {
      parsed = Number(value);
    }

    return parsed;
  }
}
