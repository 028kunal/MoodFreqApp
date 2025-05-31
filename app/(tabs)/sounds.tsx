import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { soundService } from '@/src/services/api';
import { SoundCategory } from '@/src/types';

export default function SoundsScreen() {
  const [categories, setCategories] = useState<SoundCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await soundService.getCategories();
        if (error) throw error;
        setCategories(data || []);
      } catch (err: any) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Placeholder data if no categories are loaded from Supabase yet
  const placeholderCategories = [
    { id: 'focus', name: 'Focus & Concentration', description: 'Enhance your concentration' },
    { id: 'relax', name: 'Relaxation & Anxiety Relief', description: 'Calm your mind' },
    { id: 'energy', name: 'Energy & Motivation', description: 'Boost your energy' },
    { id: 'sleep', name: 'Sleep & Deep Rest', description: 'Improve your sleep' },
    { id: 'mindfulness', name: 'Mindfulness & Meditation', description: 'Practice mindfulness' },
  ];

  const displayCategories = categories.length > 0 ? categories : placeholderCategories;

  const navigateToCategory = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Sound Library</ThemedText>
      </ThemedView>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : error ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={displayCategories}
          nestedScrollEnabled={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => navigateToCategory(item.id)}
            >
              <View style={styles.categoryContent}>
                <ThemedText style={styles.categoryTitle}>{item.name}</ThemedText>
                <ThemedText style={styles.categoryDescription}>{item.description}</ThemedText>
              </View>
              <IconSymbol size={24} name="chevron.right" color="#8E8E93" />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Account for status bar
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
});