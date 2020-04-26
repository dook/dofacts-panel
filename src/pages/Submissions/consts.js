import { rolesTypes } from 'consts';
import { ALL_OPTIONS } from 'components/Filters';

export const FILTERS = {
  [rolesTypes.ADMIN]: [
    {
      name: 'current_verdict',
      label: 'Werdykt',
      defaultValue: ALL_OPTIONS.value,
      options: [
        ALL_OPTIONS,
        {
          label: 'Brak werdyktu',
          value: 'no_verdict'
        },
        {
          label: 'Prawda',
          value: 'true'
        },
        {
          label: 'Fake News',
          value: 'false'
        },
        {
          label: 'Nieweryfikowalne',
          value: 'unidentified'
        },
        {
          label: 'Spam',
          value: 'spam'
        },
        {
          label: 'Czeka na werdykt eksperta',
          value: 'awaiting'
        }
      ]
    },
    {
      name: 'is_duplicate',
      label: 'Czy duplikat?',
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
    },
    {
      name: 'deleted',
      label: 'Czy usunięte?',
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
    },
    {
      defaultValue: ALL_OPTIONS.value,
      name: 'is_sensitive',
      label: 'Wrażliwe słowa',
      options: [
        ALL_OPTIONS,
        {
          label: 'Zawiera wrażliwe słowa',
          value: 'true'
        },
        {
          label: 'Nie zawiera wrażliwych słów',
          value: 'false'
        }
      ]
    }
  ],
  [rolesTypes.CHECKER]: [
    {
      defaultValue: 'false',
      name: 'is_opined',
      label: 'Status weryfikacji',
      options: [
        ALL_OPTIONS,
        {
          label: 'Zweryfikowane',
          value: 'true'
        },
        {
          label: 'Do weryfikacji',
          value: 'false'
        }
      ]
    }
  ],
  [rolesTypes.EXPERT]: [
    {
      defaultValue: ALL_OPTIONS.value,
      name: 'current_verdict',
      label: 'Werdykt',
      options: [
        ALL_OPTIONS,
        {
          label: 'Brak werdyktu',
          value: 'no_verdict'
        },
        {
          label: 'Prawda',
          value: 'true'
        },
        {
          label: 'Fake News',
          value: 'false'
        },
        {
          label: 'Nieweryfikowalne',
          value: 'unidentified'
        },
        {
          label: 'Spam',
          value: 'spam'
        },
        {
          label: 'Spór',
          value: 'dispute'
        }
      ]
    },
    {
      defaultValue: ALL_OPTIONS.value,
      name: 'is_spam',
      label: 'Spam',
      options: [
        ALL_OPTIONS,
        {
          label: 'Jest spamem',
          value: 'true'
        },
        {
          label: 'Nie jest spamem',
          value: 'false'
        }
      ]
    },
    {
      defaultValue: ALL_OPTIONS.value,
      name: 'is_about_corona_virus',
      label: 'Dotyczy koronawirusa?',
      options: [
        ALL_OPTIONS,
        {
          label: 'Tak',
          value: 'true'
        },
        {
          label: 'Nie',
          value: 'false'
        }
      ]
    },
    {
      defaultValue: ALL_OPTIONS.value,
      name: 'is_duplicate',
      label: 'Duplikat',
      options: [
        ALL_OPTIONS,
        {
          label: 'Jest duplikatem',
          value: 'true'
        },
        {
          label: 'Nie jest duplikatem',
          value: 'false'
        }
      ]
    },
    {
      defaultValue: ALL_OPTIONS.value,
      name: 'is_sensitive',
      label: 'Wrażliwe słowa',
      options: [
        ALL_OPTIONS,
        {
          label: 'Zawiera wrażliwe słowa',
          value: 'true'
        },
        {
          label: 'Nie zawiera wrażliwych słów',
          value: 'false'
        }
      ]
    }
  ]
};
