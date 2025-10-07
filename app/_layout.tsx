// app/_layout.tsx
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { colors } from '../constants/theme'; // ✅ updated theme import

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Choose colors based on light/dark mode
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colorScheme === 'dark' ? colors.dark.primary : colors.light.primary,
      background: colorScheme === 'dark' ? colors.dark.background : colors.light.background,
      card: colorScheme === 'dark' ? colors.dark.card : colors.light.card,
      text: colorScheme === 'dark' ? colors.dark.text : colors.light.text,
      border: colorScheme === 'dark' ? colors.dark.card : colors.light.card,
      notification: colorScheme === 'dark' ? colors.dark.primary : colors.light.primary,
    },
  };

  return (
    <ThemeProvider value={theme}>
      {/* headerShown false ensures no "index" title */}
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
