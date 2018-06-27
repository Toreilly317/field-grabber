export const formatSkills = skills => {
  if (typeof skills !== 'undefined') {
    return skills.split(',');
  }
};
export const formatTwitter = twitterLink => {
  return twitterLink.split('/')[1];
};
export const formatInstagram = InstagramLink => {
  return `@${InstagramLink.split('/')[1]}`;
};
