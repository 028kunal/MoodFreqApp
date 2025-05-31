import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { journalService } from '@/src/services/api';
import { useAuth } from '@/src/context/AuthContext';
import { MoodJournalEntry } from '@/src/types';

export default function JournalScreen() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<MoodJournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await journalService.getUserJournalEntries(user.id);
        if (error) throw error;
        setEntries(data || []);
      } catch (err: any) {
        console.error('Error fetching journal entries:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJournalEntries();
  }, [user]);

  // Placeholder data if no entries are loaded from Supabase yet
  const placeholderEntries = [
    { id: '1', user_id: '1', mood_rating: 8, notes: 'Feeling great after meditation session', created_at: new Date().toISOString(), session_id: null },
    { id: '2', user_id: '1', mood_rating: 6, notes: 'Slightly anxious but better after using the app', created_at: new Date(Date.now() - 86400000).toISOString(), session_id: null },
    { id: '3', user_id: '1', mood_rating: 9, notes: 'Slept well after using sleep sounds', created_at: new Date(Date.now() - 172800000).toISOString(), session_id: null },
  ];

  const displayEntries = entries.length > 0 ? entries : placeholderEntries;

  const getMoodEmoji = (rating: number) => {
    if (rating >= 8) return '😊';
    if (rating >= 6) return '🙂';
    if (rating >= 4) return '😐';
    if (rating >= 2) return '🙁';
    return '😢';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const navigateToNewEntry = () => {
    router.push('/journal/new');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Mood Journal</ThemedText>
        <TouchableOpacity style={styles.addButton} onPress={navigateToNewEntry}>
          <IconSymbol size={24} name="plus" color="#FFFFFF" />
        </TouchableOpacity>
      </ThemedView>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : !user ? (
        <ThemedView style={styles.messageContainer}>
          <ThemedText style={styles.messageText}>Please sign in to view your journal</ThemedText>
          <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/profile')}>
            <ThemedText style={styles.signInButtonText}>Sign In</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : error ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>Error: {error}</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={entries}
          nestedScrollEnabled={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <View style={styles.moodContainer}>
                  <ThemedText style={styles.moodEmoji}>{getMoodEmoji(item.mood_rating)}</ThemedText>
                  <ThemedText style={styles.moodRating}>{item.mood_rating}/10</ThemedText>
                </View>
                <ThemedText style={styles.entryDate}>{formatDate(item.created_at)}</ThemedText>
              </View>
              {item.notes && (
                <ThemedText style={styles.entryNotes}>{item.notes}</ThemedText>
              )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  entryCard: {
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
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  moodRating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  entryDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  entryNotes: {
    fontSize: 16,
  },
});