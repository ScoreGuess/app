import React from 'react';
import tailwind from 'tailwind-rn';
import {gql, useQuery} from '@apollo/client';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';

const GET_ALL_TEAMS = gql`
  query getAllFixture {
    allFixtures {
      startDate
      id
      awayTeam {
        shortName
        id
        logo
      }
      homeTeam {
        shortName
        id
        logo
      }
    }
  }
`;

const DATE_FORMAT = 'DD-MM-YYYYThh:mm';
const TeamLogo = ({team}) => (
  <View style={tailwind('flex-1 items-center')}>
    <Image style={{width: 32, height: 32}} source={{uri: team.logo}} />
    <Text style={tailwind('pt-4')}>{team.shortName}</Text>
  </View>
);

const FixtureList = ({fixtures}) => (
  <ScrollView style={tailwind(' h-full')}>
    {fixtures.map((fixture) => (
      <TouchableOpacity
        key={fixture.id}
        style={tailwind(' w-full p-4 border-gray-200  border-b-2')}>
        <View style={tailwind('flex-row items-end')}>
          <TeamLogo team={fixture.homeTeam} />
          <Text style={tailwind('text-center text-purple-800')}>
            {moment(fixture.startDate, DATE_FORMAT).format('DD/MM HH:mm')}
          </Text>
          <TeamLogo team={fixture.awayTeam} />
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const HomeScreen = () => {
  const {loading, data} = useQuery(GET_ALL_TEAMS);
  const fixtures = data?.allFixtures ?? [];
  return (
    <View style={tailwind('bg-white p-2 pt-12 h-full')}>
      <Text style={tailwind('text-black text-3xl px-2 my-6')}>Journée 1</Text>
      <View style={tailwind('flex-1 justify-center w-full')}>
        {loading ? <ActivityIndicator /> : <FixtureList fixtures={fixtures} />}
      </View>
    </View>
  );
};

export default HomeScreen;
