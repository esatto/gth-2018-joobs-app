import React from 'react';
import { Animated, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { MapView } from 'expo';
import { JobsContainer } from '../../store/JobsContainer';
import { JobAd } from '../../types/Job';
import { Job } from '../Job';
import { Marker } from 'react-native-maps';
import { differenceInMilliseconds } from 'date-fns/esm';
import { mapTheme } from './mapTheme';

const mapHeight = 250;

const Map = styled(MapView)`
  height: ${mapHeight};
`;

const Wrapper = styled.View`
  background-color: #fff;
  flex: 1;
`;

const ActivityWrapper = styled.View`
  padding-top: 30;
`;

interface JobsViewProps {
  jobs: JobsContainer;
  onPress: (ad: JobAd) => void;
}

export class JobsView extends React.Component<JobsViewProps> {
  state = {
    scrollY: new Animated.Value(0),
  };

  componentDidMount() {
    this.props.jobs.loadJobsByCounty(22);
  }

  renderItem = ({ item }: { item: JobAd }) => {
    return <Job ad={item} onPress={() => this.props.onPress(item)} />;
  };

  render() {
    const { scrollY } = this.state;
    const { jobs } = this.props;

    const ads = jobs.state.ids
      .map(id => jobs.state.byId[id])
      .filter(item => item.arbetsplats.arbetsplatsnamn.length < 30)
      .sort((a, b) => b.extra.percentage - a.extra.percentage);

    const translateY = scrollY.interpolate({
      inputRange: [0, mapHeight],
      outputRange: [0, mapHeight - 100],
    });

    const markers = ads.filter(item => !!item.adLocation.lat).map(item => {
      return {
        title: item.annons.annonsrubrik,
        description: item.annons.anstallningstyp,
        coords: {
          latitude: item.adLocation.lat,
          longitude: item.adLocation.lng,
        },
      };
    });

    const defaultData = markers[0]
      ? markers[0].coords
      : { latitude: 0, longitude: 0 };

    const marker = {
      ...defaultData,
      latitudeDelta: 3,
      longitudeDelta: 3,
    };

    return (
      <Animated.ScrollView
        scrollEventThrottle={10}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        style={{ flex: 1, backgroundColor: '#ffffff' }}
      >
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
        >
          <Map
            customMapStyle={mapTheme}
            provider="google"
            showsUserLocation={true}
            region={marker}
          >
            {markers.map(marker => (
              <Marker
                coordinate={marker.coords}
                key={JSON.stringify(marker)}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </Map>
        </Animated.View>
        <Wrapper>
          {jobs.state.loading && (
            <ActivityWrapper>
              <ActivityIndicator />
            </ActivityWrapper>
          )}
          <FlatList
            renderItem={this.renderItem}
            data={ads}
            keyExtractor={(item: JobAd) => item.annons.annonsid}
          />
        </Wrapper>
      </Animated.ScrollView>
    );
  }
}
