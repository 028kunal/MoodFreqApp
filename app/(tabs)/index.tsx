import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import SupabaseTest from '@/src/components/SupabaseTest';

const categories = [
  { id: '1', name: 'Focus & Concentration', icon: '🧠' },
  { id: '2', name: 'Relaxation & Anxiety Relief', icon: '🌿' },
  { id: '3', name: 'Energy & Motivation', icon: '⚡' },
  { id: '4', name: 'Sleep & Deep Rest', icon: '💤' },
  { id: '5', name: 'Mindfulness & Meditation', icon: '🧘' },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/sounds/${categoryId}`);
  };

  const HeaderComponent = () => (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">MoodFreq</ThemedText>
        <ThemedText style={styles.subtitle}>Sound Therapy for Wellness</ThemedText>
      </ThemedView>
      <SupabaseTest />
      <ThemedView style={styles.categoriesContainer}>
        <ThemedText type="subtitle">Choose a Category</ThemedText>
      </ThemedView>
    </>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ListHeaderComponent={HeaderComponent}
        data={categories}
        nestedScrollEnabled={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(item.id)}
          >
            <ThemedText style={styles.categoryIcon}>{item.icon}</ThemedText>
            <ThemedText style={styles.categoryName}>{item.name}</ThemedText>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoriesList}
        nestedScrollEnabled={true}  // Add this line if warning persists
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  categoriesContainer: {
    marginTop: 20,
  },
  categoriesList: {
    paddingVertical: 10,
  },
  categoryCard: {
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
  categoryIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
});
