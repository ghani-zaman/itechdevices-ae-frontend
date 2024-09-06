import { PriceConversionPipe } from './price-conversion.pipe';

describe('PriceConversionPipe', () => {
  it('create an instance', () => {
    const pipe = new PriceConversionPipe();
    expect(pipe).toBeTruthy();
  });
});
