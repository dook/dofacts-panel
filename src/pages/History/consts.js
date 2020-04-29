import { rolesTypes } from 'consts';
import { ALL_OPTIONS } from 'components/Filters';

export const FILTERS = {
  ALL: [
    {
      name: 'current_verdict',
      label: 'Status weryfikacji',
      defaultValue: ALL_OPTIONS.value,
      options: [
        ALL_OPTIONS,
        {
          i18nkey: 'verdictTypes.true',
          label: 'Prawda',
          value: 'true'
        },
        {
          i18nkey: 'verdictTypes.false',
          label: 'Fałsz',
          value: 'false'
        },
        {
          i18nkey: 'verdictTypes.unidentified',
          label: 'Nieweryfikowalne',
          value: 'unidentified'
        }
      ]
    }
  ],
  [rolesTypes.CHECKER]: [
    {
      name: 'is_assigned_to_me',
      label: 'Przypisane do mnie',
      defaultValue: ALL_OPTIONS.value,
      options: [
        ALL_OPTIONS,
        {
          i18nkey: 'filters.yes',
          label: 'Tak',
          value: true
        },
        {
          i18nkey: 'filters.no',
          label: 'Nie',
          value: false
        }
      ]
    }
  ]
};
