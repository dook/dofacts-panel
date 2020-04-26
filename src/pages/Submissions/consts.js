import { rolesTypes } from 'consts';
import { ALL_OPTIONS } from 'components/Filters';

export const FILTERS = {
  [rolesTypes.ADMIN]: [
    {
      name: 'current_verdict',
      i18nkey: 'filters.verdict',
      label: 'Werdykt',
      defaultValue: ALL_OPTIONS.value,
      options: [
        ALL_OPTIONS,
        {
          i18nkey: 'verdictTypes.no_verdict',
          label: 'Brak werdyktu',
          value: 'no_verdict'
        },
        {
          i18nkey: 'verdictTypes.true',
          label: 'Prawda',
          value: 'true'
        },
        {
          i18nkey: 'verdictTypes.false',
          label: 'Fake News',
          value: 'false'
        },
        {
          i18nkey: 'verdictTypes.unidentified',
          label: 'Nieweryfikowalne',
          value: 'unidentified'
        },
        {
          i18nkey: 'verdictTypes.spam',
          label: 'Spam',
          value: 'spam'
        },
        {
          i18nkey: 'verdictTypes.awaiting',
          label: 'Czeka na werdykt eksperta',
          value: 'awaiting'
        }
      ]
    },
    {
      name: 'is_duplicate',
      i18nkey: 'filters.isDuplicate',
      label: 'Czy duplikat?',
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
    },
    {
      name: 'deleted',
      i18nkey: 'filters.deleted',
      label: 'Czy usunięte?',
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
    },
    {
      defaultValue: ALL_OPTIONS.value,
      name: 'is_sensitive',
      i18nkey: 'filters.isSensitive',
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
      i18nkey: 'filters.verificationStatus',
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
      i18nkey: 'filters.verdict',
      label: 'Werdykt',
      options: [
        ALL_OPTIONS,
        {
          i18nkey: 'verdictTypes.no_verdict',
          label: 'Brak werdyktu',
          value: 'no_verdict'
        },
        {
          i18nkey: 'verdictTypes.true',
          label: 'Prawda',
          value: 'true'
        },
        {
          i18nkey: 'verdictTypes.false',
          label: 'Fake News',
          value: 'false'
        },
        {
          i18nkey: 'verdictTypes.unidentified',
          label: 'Nieweryfikowalne',
          value: 'unidentified'
        },
        {
          i18nkey: 'verdictTypes.spam',
          label: 'Spam',
          value: 'spam'
        },
        {
          i18nkey: 'verdictTypes.dispute',
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
          i18nkey: 'filters.yes',
          label: 'Tak',
          value: 'true'
        },
        {
          i18nkey: 'filters.no',
          label: 'Nie',
          value: 'false'
        }
      ]
    },
    {
      defaultValue: ALL_OPTIONS.value,
      name: 'is_duplicate',
      i18nkey: 'filters.isDuplicate',
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
      i18nkey: 'filters.isSensitive',
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
