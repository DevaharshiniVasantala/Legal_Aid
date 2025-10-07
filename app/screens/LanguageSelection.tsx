import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/theme'; // updated theme import
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LanguageSelection: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Select Language</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('LoginScreen', { language: 'Telugu' })}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>తెలుగు</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('LoginScreen', { language: 'English' })}
        activeOpacity={0.8}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>English</Text>
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
