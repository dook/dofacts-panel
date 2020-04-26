/* eslint-disable no-template-curly-in-string */
import { setLocale } from 'yup';

const mixed = {
  required: 'To pole jest wymagane'
};

const string = {
  min: 'To pole wymaga co najmniej ${min} znaków',
  email: 'Podaj prawidłowy adres e-mail',
  url: 'Podaj prawidłowy adres URL'
};

const number = {};

const date = {};

const boolean = {};

const object = {};

const array = {};

const messages = {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean
};

setLocale(messages);
