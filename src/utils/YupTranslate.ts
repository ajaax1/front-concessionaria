import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'Campo inválido',
    required: 'Este campo é obrigatório',
    oneOf: 'Deve ser um dos seguintes valores: ${values}',
    notOneOf: 'Não pode ser um dos seguintes valores: ${values}',
    defined: 'Este campo precisa ser definido',
  },
  string: {
    length: 'Deve ter exatamente ${length} caracteres',
    min: 'Deve ter pelo menos ${min} caracteres',
    max: 'Deve ter no máximo ${max} caracteres',
    matches: 'Deve corresponder ao padrão: "${regex}"',
    email: 'Deve ser um e-mail válido',
    url: 'Deve ser uma URL válida',
    uuid: 'Deve ser um UUID válido',
    trim: 'Não pode conter espaços no início ou no fim',
    lowercase: 'Deve estar em letras minúsculas',
    uppercase: 'Deve estar em letras maiúsculas',
    oneOf: 'Deve ser um dos seguintes valores: ${values}',
  },
  number: {
    min: 'Deve ser no mínimo ${min}',
    max: 'Deve ser no máximo ${max}',
    lessThan: 'Deve ser menor que ${less}',
    moreThan: 'Deve ser maior que ${more}',
    positive: 'Deve ser um número positivo',
    negative: 'Deve ser um número negativo',
    integer: 'Deve ser um número inteiro',
  },
  date: {
    min: 'A data deve ser posterior a ${min}',
    max: 'A data deve ser anterior a ${max}',
  },
  boolean: {
    isValue: 'O valor precisa ser ${value}',
  },
  object: {
    noUnknown: 'Contém chaves não especificadas no esquema',
  },
  array: {
    min: 'Deve ter no mínimo ${min} itens',
    max: 'Deve ter no máximo ${max} itens',
    length: 'Deve conter exatamente ${length} itens',
  },
});
