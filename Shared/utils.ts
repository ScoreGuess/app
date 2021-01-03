import moment from 'moment';

interface sorByStartDateInterface {
  (a: {startDate: string}, b: {startDate: string}): number;
}

const sortByStartDate: sorByStartDateInterface = (a, b) => {
  return moment(a.startDate).diff(moment(b.startDate));
};

export const groupByMatchDay = (fixtures: any[]) =>
  Object.entries(
    fixtures.reduce((groupedFixtures, fixture) => {
      const {name} = fixture.competition;
      const matchDay = fixture.matchDay;
      const label = `${name} - ${matchDay}ème journée`;
      const group = groupedFixtures[label] ?? [];

      const fixturesByMatchDay = [...group, fixture];
      const sortedFixtures = fixturesByMatchDay.sort(sortByStartDate);
      return {
        ...groupedFixtures,
        [label]: sortedFixtures,
      };
    }, {}),
  ).map(([label, data]) => {
    return {
      title: label,
      data,
    };
  });
