import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/src/context/AuthContext';

export default function ProfileScreen() {
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await signOut();
      if (error) throw error;
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>

      {user ? (
        <ThemedView style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <IconSymbol size={60} name="person.fill" color="#4A90E2" />
          </View>
          <ThemedText style={styles.emailText}>{user.email}</ThemedText>
          
          <ThemedView style={styles.settingsContainer}>
            <ThemedText type="subtitle" style={styles.settingsTitle}>Settings</ThemedText>
            
            <TouchableOpacity style={styles.settingItem}>
              <IconSymbol size={24} name="bell.fill" color="#4A90E2" />
              <ThemedText style={styles.settingText}>Notifications</ThemedText>
              <IconSymbol size={16} name="chevron.right" color="#8E8E93" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <IconSymbol size={24} name="gear" color="#4A90E2" />
              <ThemedText style={styles.settingText}>App Settings</ThemedText>
              <IconSymbol size={16} name="chevron.right" color="#8E8E93" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <IconSymbol size={24} name="questionmark.circle" color="#4A90E2" />
              <ThemedText style={styles.settingText}>Help & Support</ThemedText>
              <IconSymbol size={16} name="chevron.right" color="#8E8E93" />
            </TouchableOpacity>
          </ThemedView>
          
          <TouchableOpacity 
            style={styles.signOutButton} 
            onPress={handleSignOut}
            disabled={loading}
          >
            <ThemedText style={styles.signOutButtonText}>
              {loading ? 'Signing Out...' : 'Sign Out'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={styles.loginContainer}>
          <ThemedText type="subtitle" style={styles.loginTitle}>Sign In</ThemedText>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity 
            style={styles.signInButton} 
            onPress={handleSignIn}
            disabled={loading}
          >
            <ThemedText style={styles.signInButtonText}>
              {loading ? 'Signing In...' : 'Sign In'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}

      {/* Added styles definition that was missing */}
      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>MoodFreq v1.0</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    paddingTop: 16,
  },
  profileContainer: {
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E1E9F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 24,
  },
  settingsContainer: {
    width: '100%',
    marginTop: 16,
    marginBottom: 24,
  },
  settingsTitle: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
  },
  signOutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    alignItems: 'center',
  },
  signOutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginContainer: {
    padding: 16,
    width: '100%',
  },
  loginTitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  signInButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 16,
  },
  footerText: {
    fontSize: 12,
    color: '#8E8E93',
  },
});