import { describe, it, expect } from 'vitest';
import { formatPrice, validateEmail, validateRUN } from '../../utils/validation';

/**
 * formato CLP
 */
describe('formatPrice', () => {
  it('debería formatear precios correctamente en formato CLP', () => {
    expect(formatPrice(1000)).toBe('$1.000');
    expect(formatPrice(25000)).toBe('$25.000');
    expect(formatPrice(150000)).toBe('$150.000');
  });
});

/**
 * validacion formato email
 */
describe('validateEmail', () => {
  it('debería validar correctamente emails de dominios permitidos', () => {
    expect(validateEmail('admin@duoc.cl')).toBe(true);
    expect(validateEmail('vendedor@duoc.cl')).toBe(true);
    expect(validateEmail('profesor@profesor.duoc.cl')).toBe(true);
    expect(validateEmail('cliente@gmail.com')).toBe(true);
  });
});

/**
 * Validacion RUT chileno
 */
describe('validateRUN', () => {
  it('debería validar RUTs chilenos correctos con algoritmo DV', () => {
    expect(validateRUN('11.111.111-1')).toBe(true);
    expect(validateRUN('11.111.111-5')).toBe(false);
  });
});
