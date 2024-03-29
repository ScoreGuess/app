import moment from 'moment';

export const computePoints = (user, createdAt) => {
  Object.values(user.predictions ?? {})
    .filter((p) => p.fixture == null)
    .map((p) => console.log(p));
  return Object.values(user.predictions ?? {})
    .filter((p) => p.fixture && moment(p.fixture.startDate).isAfter(createdAt))
    .flatMap((prediction) => prediction.attributes)
    .map((attribute) => attribute.type)
    .reduce((sum, type) => {
      if (type === 'EXACT_SCORE') return sum + 3;
      else if (type === 'EXACT_RESULT') return sum + 1;
      return sum;
    }, 0);
};
