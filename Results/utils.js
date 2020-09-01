export const computePoints = (user) =>
  Object.values(user.predictions ?? {})
    .flatMap((prediction) => prediction.attributes)
    .map((attribute) => attribute.type)
    .reduce((sum, type) => {
      if (type === 'EXACT_SCORE') return sum + 3;
      else if (type === 'EXACT_RESULT') return sum + 1;
      return sum;
    }, 0);
