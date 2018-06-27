import { formatSkills, formatInstagram, formatTwitter } from './fieldFunction';

const wantedFields = [
  'handle',
  'company',
  'website',
  'location',
  'bio',
  'status',
  'githubusername',
  ['skills', formatSkills],
  ['formattedSkills', 'skills', formatSkills],
  {
    name: 'social',
    wantedFields: [
      'facebook',
      ['instagram', formatInstagram],
      ['customField', 'twitter'],
      {
        name: 'twitter',
        wantedFields: [
          ['username', 'twitter', formatTwitter],
          ['link', 'twitter']
        ]
      }
    ]
  }
];

export default wantedFields;
