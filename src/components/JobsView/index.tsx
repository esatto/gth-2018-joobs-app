import React from 'react';
import { Animated, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { MapView } from 'expo';
import { JobsContainer } from '../../store/JobsContainer';
import { JobAd } from '../../types/Job';
import { Job } from '../Job';
import { Marker } from 'react-native-maps';
import { differenceInMilliseconds } from 'date-fns/esm';

const Map = styled(MapView)`
  height: 200;
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
      .sort((a, b) =>
        differenceInMilliseconds(
          b.annons.publiceraddatum,
          a.annons.publiceraddatum,
        ),
      );

    const scale = scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.5, 1],
      extrapolateRight: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange: [-100, 0],
      outputRange: [-50, 0],
      extrapolateRight: 'clamp',
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

    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        style={{ flex: 1 }}
      >
        <Animated.View style={{ transform: [{ scale }, { translateY }] }}>
          <Map>
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
      </Animated.ScrollView>
    );
  }
}
