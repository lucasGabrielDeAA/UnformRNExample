import * as Yup from 'yup';
import * as CPF from 'gerador-validador-cpf';

Yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
    typeError: 'Valor inválido',
  },
  string: {
    email: 'Preencha um e-mail válido',
  },
  number: {
    min: 'O número informado deve ser no mínimo ${min}',
    integer: 'Este número deve ser um inteiro',
    typeError: 'O valor precisa ser um número válido',
  },
  array: {
    required: 'Esta lista não pode estar vazia',
  },
});

Yup.addMethod(Yup.string, 'cpf', () => {
  return Yup.mixed().test('cpf', 'CPF inválido', value => CPF.validate(value));
});

export default Yup;
