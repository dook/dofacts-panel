export const rolesTypes = {
  ADMIN: 'admin',
  EXPERT: 'expert',
  CHECKER: 'fact_checker'
};

export const verdictTypes = {
  no_verdict: 'Brak werdyktu',
  true: 'Prawda',
  false: 'Fake News',
  unidentified: 'Nieweryfikowalne',
  spam: 'Spam',
  awaiting: 'Czeka na werdykt eksperta',
  dispute: 'Spór'
};

export const specializationTypes = {
  journalism: 'Dziennikarstwo',
  biology: 'Biologia',
  physics: 'Fizyka',
  IT: 'IT',
  chemistry: 'Chemia',
  economy: 'Ekonomia',
  other: 'Inne'
};

export const specializationOptions = Object.entries(specializationTypes).map(([value, label]) => ({ label, value }));
