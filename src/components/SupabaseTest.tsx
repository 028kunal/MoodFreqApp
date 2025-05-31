import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { supabase } from '../config/supabase';

const SupabaseTest = () => {
  const [status, setStatus] = useState<string>('Testing connection...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Simple query to test connection
        const { data, error } = await supabase.from('sound_categories').select('count');
        
        if (error) throw error;
        
        setStatus('Connection successful! 🎉');
      } catch (err: any) {
        setStatus('Connection failed');
        setError(err.message);
        console.error('Supabase connection error:', err);
      }
    };

    testConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{status}</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
  },
});

export default SupabaseTest;