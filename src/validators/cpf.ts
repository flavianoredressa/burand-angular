import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Valida um número de CPF (Cadastro de Pessoas Físicas).
 *
 * @example <caption>Valide se o campo corresponde a um CPF válido</caption>
 * ```typescript
 * const control = new FormControl('11111111111', cpfValidator);
 *
 * console.log(control.errors); // {cpfInvalid: true}
 * ```
 *
 * @param control - O `AbstractControl` do formulário a ser validado.
 * @returns Retorna um objeto de erro com a chave `cpfInvalid` se o CPF for inválido, caso contrário retorna `null`.
 */
export function cpfValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const cpf = String(control.value).replace(/\D/g, '');
  if (cpf.length !== 11) {
    return { cpfInvalid: true };
  }

  if (
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return { cpfInvalid: true };
  }

  let soma = 0;
  for (let i = 1; i <= 9; i += 1) {
    soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10), 10)) {
    return { cpfInvalid: true };
  }

  soma = 0;
  for (let i = 1; i <= 10; i += 1) {
    soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto === parseInt(cpf.substring(10, 11), 10)) {
    return null;
  }

  return { cpfInvalid: true };
}
