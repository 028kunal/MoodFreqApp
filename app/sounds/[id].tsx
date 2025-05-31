import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Slider from '@react-native-community/slider';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function SoundDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Mock data - in a real app, you would fetch this from Supabase
  const soundData = {
    title: 'Deep Focus 40Hz',
    description: 'A binaural beat designed to enhance concentration and focus by synchronizing your brainwaves to 40Hz, associated with gamma waves and heightened cognitive function.',
    duration: '30:00',
    frequency: '40Hz',
    type: 'Binaural Beat',
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          title: soundData.title,
          headerBackTitle: 'Back',
        }} 
      />
      
      <ThemedView style={styles.playerCard}>
        <ThemedView style={styles.waveformContainer}>
          <IconSymbol size={150} name="waveform" color="#4A90E2" style={styles.waveform} />
        </ThemedView>
        
        <ThemedText style={styles.title}>{soundData.title}</ThemedText>
        <ThemedText style={styles.meta}>{soundData.type} • {soundData.frequency}</ThemedText>
        
        <ThemedView style={styles.progressContainer}>
          <ThemedText style={styles.timeText}>0:00</ThemedText>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
          <ThemedText style={styles.timeText}>{soundData.duration}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.controlsContainer}>
          <TouchableOpacity style={styles.controlButton}>
            <IconSymbol size={24} name="backward.fill" color="#4A90E2" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
            <IconSymbol 
              size={30} 
              name={isPlaying ? "pause.fill" : "play.fill"} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <IconSymbol size={24} name="forward.fill" color="#4A90E2" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.descriptionContainer}>
        <ThemedText style={styles.descriptionTitle}>About this sound</ThemedText>
        <ThemedText style={styles.descriptionText}>{soundData.description}</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <IconSymbol size={20} name="plus" color="#4A90E2" />
          <ThemedText style={styles.optionText}>Add Nature Sounds</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <IconSymbol size={20} name="timer" color="#4A90E2" />
          <ThemedText style={styles.optionText}>Set Timer</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <IconSymbol size={20} name="heart" color="#4A90E2" />
          <ThemedText style={styles.optionText}>Save to Favorites</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  playerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  waveformContainer: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  waveform: {
    opacity: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  meta: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 40,
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    width: 40,
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  controlButton: {
    padding: 10,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});