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
          label: 'Prawda',
          value: 'true'
        },
        {
          label: 'Fałsz',
          value: 'false'
        },
        {
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
          label: 'Tak',
          value: true
        },
        {
          label: 'Nie',
          value: false
        }
      ]
    }
  ]
};
