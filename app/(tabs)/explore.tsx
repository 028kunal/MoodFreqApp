import { Image } from 'expo-image';
import { Platform, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Styles for TabTwoScreen
const tabTwoStyles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

// First component (original TabTwoScreen)
export function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={tabTwoStyles.headerImage}
        />
      }>
      <ThemedView style={tabTwoStyles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

// Featured sounds data
const featuredSounds = [
  { id: '1', title: 'Deep Focus 40Hz', type: 'Binaural Beat', duration: '30 min' },
  { id: '2', title: 'Anxiety Relief 432Hz', type: 'Solfeggio', duration: '20 min' },
  { id: '3', title: 'Peaceful Rain', type: 'Nature Sound', duration: '60 min' },
  { id: '4', title: 'Energy Boost 528Hz', type: 'Solfeggio', duration: '15 min' },
  { id: '5', title: 'Deep Sleep Delta Waves', type: 'Brainwave', duration: '8 hours' },
];

// Styles for ExploreScreen
const exploreStyles = StyleSheet.create({
  headerImage: {
    opacity: 0.6,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  soundsList: {
    paddingBottom: 20,
  },
  soundCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  soundIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  soundInfo: {
    flex: 1,
  },
  soundTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  soundMeta: {
    fontSize: 12,
    color: '#888',
  },
});

// Second component (new ExploreScreen)
export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState('featured');
  
  // Add this data state
  const [exploreData, setExploreData] = useState([
    { id: '1', title: 'Ocean Waves', type: 'Nature', duration: '10 min' },
    { id: '2', title: 'Rainfall', type: 'Nature', duration: '15 min' },
    // Add more sample data as needed
  ]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={100}
          color="#808080"
          name="waveform"
          style={exploreStyles.headerImage}
        />
      }>
      <ThemedView style={exploreStyles.titleContainer}>
        <ThemedText type="title">Explore Sounds</ThemedText>
      </ThemedView>

      <ThemedView style={exploreStyles.tabContainer}>
        <TouchableOpacity 
          style={[exploreStyles.tab, activeTab === 'featured' && exploreStyles.activeTab]}
          onPress={() => setActiveTab('featured')}
        >
          <ThemedText style={activeTab === 'featured' ? exploreStyles.activeTabText : exploreStyles.tabText}>Featured</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[exploreStyles.tab, activeTab === 'new' && exploreStyles.activeTab]}
          onPress={() => setActiveTab('new')}
        >
          <ThemedText style={activeTab === 'new' ? exploreStyles.activeTabText : exploreStyles.tabText}>New</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[exploreStyles.tab, activeTab === 'popular' && exploreStyles.activeTab]}
          onPress={() => setActiveTab('popular')}
        >
          <ThemedText style={activeTab === 'popular' ? exploreStyles.activeTabText : exploreStyles.tabText}>Popular</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={exploreData}
        nestedScrollEnabled={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={exploreStyles.soundCard}>
            <ThemedView style={exploreStyles.soundIconContainer}>
              <IconSymbol size={30} name="waveform" color="#4A90E2" />
            </ThemedView>
            <ThemedView style={exploreStyles.soundInfo}>
              <ThemedText style={exploreStyles.soundTitle}>{item.title}</ThemedText>
              <ThemedText style={exploreStyles.soundMeta}>{item.type} • {item.duration}</ThemedText>
            </ThemedView>
            <IconSymbol size={24} name="play.fill" color="#4A90E2" />
          </TouchableOpacity>
        )}
        contentContainerStyle={exploreStyles.soundsList}
      />
    </ParallaxScrollView>
  );
}

// REMOVE THIS DUPLICATE STYLES DECLARATION
// const exploreStyles = StyleSheet.create({ ... });
