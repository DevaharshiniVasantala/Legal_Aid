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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RegisterScreen'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'RegisterScreen'>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RegisterScreenRouteProp>();
  const language = route.params?.language || 'English';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    navigation.navigate('HomeScreen', { language });
  };

  const handleLogin = () => {
    navigation.goBack();
  };

  const text = {
    Telugu: {
      title: 'ఖాతా సృష్టించండి',
      subtitle: 'చట్టపరమైన సహాయాన్ని పొందడానికి నమోదు చేసుకోండి',
      name: 'పూర్తి పేరు',
      namePlaceholder: 'మీ పూర్తి పేరు నమోదు చేయండి',
      phone: 'ఫోన్ నంబర్',
      phonePlaceholder: 'మీ ఫోన్ నంబర్ నమోదు చేయండి',
      email: 'ఇమెయిల్ చిరునామా',
      emailPlaceholder: 'మీ ఇమెయిల్ నమోదు చేయండి',
      password: 'పాస్‌వర్డ్',
      passwordPlaceholder: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
      registerButton: 'ఖాతా సృష్టించండి',
      alreadyAccount: 'ఇప్పటికే ఖాతా ఉందా? ',
      signIn: 'సైన్ ఇన్ చేయండి',
    },
    English: {
      title: 'Create Account',
      subtitle: 'Register to access legal support',
      name: 'Full Name',
      namePlaceholder: 'Enter your full name',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      registerButton: 'Create Account',
      alreadyAccount: 'Already have an account? ',
      signIn: 'Sign In',
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
          <Ionicons name="person-add-outline" size={60} color="#ffffff" style={styles.headerIcon} />
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
            {/* Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t.name}</Text>
              <TextInput
                style={styles.input}
                placeholder={t.namePlaceholder}
                placeholderTextColor="#94a3b8"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Phone */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t.phone}</Text>
              <TextInput
                style={styles.input}
                placeholder={t.phonePlaceholder}
                placeholderTextColor="#94a3b8"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t.email}</Text>
              <TextInput
                style={styles.input}
                placeholder={t.emailPlaceholder}
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
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
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
              <LinearGradient
                colors={['#8b5cf6', '#7c3aed']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.registerGradient}
              >
                <Text style={styles.registerButtonText}>{t.registerButton}</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>{t.alreadyAccount}</Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.signInLink}>{t.signIn}</Text>
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
  registerButton: { borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  registerGradient: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  registerButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  signInContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signInText: { color: '#64748b', fontSize: 14 },
  signInLink: { color: '#8b5cf6', fontSize: 14, fontWeight: '700', marginLeft: 4 },
});

export default RegisterScreen;
