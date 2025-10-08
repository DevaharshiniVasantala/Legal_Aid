import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LanguageSelection: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Decorative circles */}
      <View style={[styles.decorativeCircle, styles.circle1]} />
      <View style={[styles.decorativeCircle, styles.circle2]} />

      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', width: '100%' }}>
        <Text style={styles.title}>Select Language</Text>
        <Text style={styles.subtitle}>Choose your preferred language to continue</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('LoginScreen', { language: 'Telugu' })}
        >
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>తెలుగు</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('LoginScreen', { language: 'English' })}
        >
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>English</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },
  decorativeCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderRadius: 1000,
  },
  circle1: {
    width: 180,
    height: 180,
    top: -60,
    right: -50,
  },
  circle2: {
    width: 120,
    height: 120,
    bottom: -30,
    left: -40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '70%',
    borderRadius: 16,
    marginVertical: 12,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  gradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default LanguageSelection;
