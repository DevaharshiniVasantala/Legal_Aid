import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { colors } from '../constants/theme'; // ✅ updated theme import

export default function RootLayout() {
  // Define a single consistent theme based on your updated colors
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <ThemeProvider value={theme}>
      {/* headerShown false ensures no "index" title */}
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
