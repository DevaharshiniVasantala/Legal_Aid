import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<LoginScreenRouteProp>();
  const language = route.params?.language || 'English';

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigation.navigate('HomeScreen', { language });
  };

  const handleRegister = () => {
    navigation.navigate('RegisterScreen', { language });
  };

  const text = {
    Telugu: {
      title: 'స్వాగతం',
      subtitle: 'లీగల్ ఎయిడ్‌కి కొనసాగించడానికి సైన్ ఇన్ చేయండి',
      phone: 'ఫోన్ నంబర్',
      phonePlaceholder: 'మీ ఫోన్ నంబర్ నమోదు చేయండి',
      password: 'పాస్‌వర్డ్',
      passwordPlaceholder: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
      forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      signIn: 'సైన్ ఇన్',
      noAccount: 'ఖాతా లేదా? ',
      signUp: 'సైన్ అప్',
    },
    English: {
      title: 'Welcome Back',
      subtitle: 'Sign in to continue to Legal Aid',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      forgotPassword: 'Forgot Password?',
      signIn: 'Sign In',
      noAccount: "Don't have an account? ",
      signUp: 'Sign Up',
    },
  };

  const t = text[language as keyof typeof text] || text.English;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient
        colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="person-circle-outline" size={60} color="#ffffff" style={styles.headerIcon} />
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>
        </View>

        {/* Decorative circles */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>
            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t.phone}</Text>
              <TextInput
                style={styles.input}
                placeholder={t.phonePlaceholder}
                placeholderTextColor="#94a3b8"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t.password}</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder={t.passwordPlaceholder}
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>{t.forgotPassword}</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#8b5cf6', '#7c3aed']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.signInGradient}
              >
                <Text style={styles.signInButtonText}>{t.signIn}</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>{t.noAccount}</Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.signUpLink}>{t.signUp}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  headerContent: { alignItems: 'center', zIndex: 10 },
  headerIcon: { marginBottom: 12 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  decorativeCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 1000,
  },
  circle1: { width: 180, height: 180, top: -60, right: -50 },
  circle2: { width: 120, height: 120, bottom: -30, left: -40 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
  form: { flex: 1 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#1e293b', marginBottom: 8 },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  passwordInput: { flex: 1, padding: 16, fontSize: 16, color: '#1e293b' },
  eyeButton: { padding: 16 },
  eyeIcon: { fontSize: 20 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { color: '#ec4899', fontSize: 14, fontWeight: '600' },
  signInButton: { borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  signInGradient: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  signInButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  signUpContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signUpText: { color: '#64748b', fontSize: 14 },
  signUpLink: { color: '#8b5cf6', fontSize: 14, fontWeight: '700', marginLeft: 4 },
});

export default LoginScreen;
