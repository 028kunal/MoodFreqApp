import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../config/supabase';

const TestSupabaseScreen = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // A simple query to test the connection
        const { data, error } = await supabase.from('sound_categories').select('count');
        
        if (error) throw error;
        
        setIsConnected(true);
      } catch (err: any) {
        console.error('Supabase connection error:', err);
        setError(err.message);
        setIsConnected(false);
      }
    };

    testConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Connection Test</Text>
      
      {isConnected === null ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : isConnected ? (
        <View>
          <Text style={styles.successText}>✅ Connected to Supabase successfully!</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.errorText}>❌ Failed to connect to Supabase</Text>
          {error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  successText: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  errorMessage: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
});

export default TestSupabaseScreen;