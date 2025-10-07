import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;

const colors = {
  peach: '#F4D9C6',
  blueGray: '#C5D5D8',
  ivory: '#FFF9F0',
  darkText: '#3A3A3A',
  lightText: '#7D7D7D',
};

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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Phone Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t.phone}</Text>
            <TextInput
              style={styles.input}
              placeholder={t.phonePlaceholder}
              placeholderTextColor={colors.lightText}
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
                placeholderTextColor={colors.lightText}
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
            <Text style={styles.signInButtonText}>{t.signIn}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ivory },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  header: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: '700', color: colors.darkText, marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.lightText },
  form: { flex: 1 },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: colors.darkText, marginBottom: 8 },
  input: { backgroundColor: 'white', borderWidth: 2, borderColor: `${colors.blueGray}40`, borderRadius: 12, padding: 16, fontSize: 16, color: colors.darkText },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderWidth: 2, borderColor: `${colors.blueGray}40`, borderRadius: 12 },
  passwordInput: { flex: 1, padding: 16, fontSize: 16, color: colors.darkText },
  eyeButton: { padding: 16 },
  eyeIcon: { fontSize: 20 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 24 },
  forgotPasswordText: { color: colors.peach, fontSize: 14, fontWeight: '600' },
  signInButton: { backgroundColor: colors.peach, borderRadius: 12, padding: 18, alignItems: 'center', marginBottom: 20 },
  signInButtonText: { color: colors.darkText, fontSize: 16, fontWeight: '700' },
  signUpContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signUpText: { color: colors.lightText, fontSize: 14 },
  signUpLink: { color: colors.peach, fontSize: 14, fontWeight: '700' },
});

export default LoginScreen;
