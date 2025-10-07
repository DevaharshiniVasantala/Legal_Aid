// app/screens/LanguageSelection.tsx

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { colors } from '../../constants/theme'; // updated path for Expo
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LanguageSelection: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.primary }]}>Select Language</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.primary }]}
        onPress={() => navigation.navigate('LoginScreen', { language: 'Telugu' })}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: themeColors.background }]}>తెలుగు</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.primary }]}
        onPress={() => navigation.navigate('LoginScreen', { language: 'English' })}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: themeColors.background }]}>English</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    padding: 15,
    marginVertical: 10,
    width: '60%',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LanguageSelection;
