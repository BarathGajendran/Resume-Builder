import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator,
  SafeAreaView
} from 'react-native';

interface AuthScreenProps {
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (!email || !password || (!isLogin && !name)) {
        setError('Please fill in all fields.');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }

      setLoading(false);
      onLoginSuccess({
        name: isLogin ? email.split('@')[0] : name,
        email: email,
      });
    }, 800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.innerContainer}>
          {/* Top Decorative Line */}
          <View style={styles.decorativeLine} />

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.sparkleBadge}>
              <Text style={styles.sparkleText}>✦</Text>
            </View>
            <Text style={styles.title}>
              {isLogin ? 'Welcome back' : 'Create account'}
            </Text>
            <Text style={styles.subtitle}>
              Elegance Resume Designer
            </Text>
          </View>

          {/* Form */}
          <View style={styles.card}>
            {error ? (
              <View style={styles.errorAlert}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {!isLogin && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Alex Morgan"
                  placeholderTextColor="#ccc"
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="alex.morgan@example.com"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#ccc"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity 
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>
                  {isLogin ? 'Sign In ➜' : 'Register ➜'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.toggleButton}
              onPress={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              <Text style={styles.toggleButtonText}>
                {isLogin
                  ? "Don't have an account? Sign Up"
                  : 'Already have an account? Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f1ec',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  decorativeLine: {
    width: 120,
    height: 3,
    backgroundColor: '#c5a059',
    marginBottom: 32,
    borderRadius: 1.5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  sparkleBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e8e4de',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sparkleText: {
    fontSize: 18,
    color: '#c5a059',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#888',
    marginTop: 8,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e8e4de',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  errorAlert: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fee2e2',
    borderRadius: 2,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#888',
    marginBottom: 6,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e0dbd2',
    fontSize: 13,
    color: '#333',
    paddingVertical: 4,
  },
  button: {
    height: 44,
    backgroundColor: '#1a1a1a',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  toggleButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  toggleButtonText: {
    color: '#c5a059',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
