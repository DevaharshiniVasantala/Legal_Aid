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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'RegisterScreen'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'RegisterScreen'>;

const colors = {
  peach: '#F4D9C6',
  blueGray: '#C5D5D8',
  ivory: '#FFF9F0',
  darkText: '#3A3A3A',
  lightText: '#7D7D7D',
};

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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t.name}</Text>
            <TextInput style={styles.input} placeholder={t.namePlaceholder} placeholderTextColor={colors.lightText} value={name} onChangeText={setName} autoCapitalize="words" />
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t.phone}</Text>
            <TextInput style={styles.input} placeholder={t.phonePlaceholder} placeholderTextColor={colors.lightText} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t.email}</Text>
            <TextInput style={styles.input} placeholder={t.emailPlaceholder} placeholderTextColor={colors.lightText} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t.password}</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={styles.passwordInput} placeholder={t.passwordPlaceholder} placeholderTextColor={colors.lightText} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} autoCapitalize="none" />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Register */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.registerButtonText}>{t.registerButton}</Text>
          </TouchableOpacity>

          {/* Sign In */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>{t.alreadyAccount}</Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signInLink}>{t.signIn}</Text>
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
  registerButton: { backgroundColor: colors.blueGray, borderRadius: 12, padding: 18, alignItems: 'center', marginBottom: 20 },
  registerButtonText: { color: colors.darkText, fontSize: 16, fontWeight: '700' },
  signInContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signInText: { color: colors.lightText, fontSize: 14 },
  signInLink: { color: colors.blueGray, fontSize: 14, fontWeight: '700' },
});

export default RegisterScreen;
