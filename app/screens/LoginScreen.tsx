// app/screens/LoginScreen.tsx

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
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
  useColorScheme,
} from 'react-native';
import { colors } from '../../constants/theme'; // updated path for Expo
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'LoginScreen'>>();
  const { language } = route.params;

  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('HomeScreen', { language });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.wrapper, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.title, { color: themeColors.primary }]}>
          {language === 'Telugu' ? 'లాగిన్' : 'Login'}
        </Text>

        <TextInput
          style={[styles.input, { borderColor: themeColors.primary, color: themeColors.text }]}
          placeholder={language === 'Telugu' ? 'వాడుకరి పేరు' : 'Username'}
          placeholderTextColor={themeColors.text + '99'}
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={[styles.input, { borderColor: themeColors.primary, color: themeColors.text }]}
          placeholder={language === 'Telugu' ? 'పాస్‌వర్డ్' : 'Password'}
          placeholderTextColor={themeColors.text + '99'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColors.primary }]}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: themeColors.background }]}>
            {language === 'Telugu' ? 'ప్రవేశించండి' : 'Login'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },
  button: { padding: 15, marginTop: 20, borderRadius: 8 },
  buttonText: { textAlign: 'center', fontSize: 18, fontWeight: '600' },
});

export default LoginScreen;
