// // app/screens/KnowYourRights.tsx

import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, useColorScheme } from 'react-native';
import { colors } from '../../constants/theme'; // updated path for Expo
import { RootStackParamList } from '../navigation/AppNavigator';

const KnowYourRights: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'KnowYourRights'>>();
  const language = (route.params as { language?: string } | undefined)?.language || 'English';

  const colorScheme = useColorScheme(); // 'light' or 'dark'
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Text style={[styles.title, { color: themeColors.primary }]}>
        {language === 'Telugu' ? 'మీ హక్కులు తెలుసుకోండి' : 'Know Your Rights'}
      </Text>

      <Text style={[styles.text, { color: themeColors.text }]}>
        {language === 'Telugu'
          ? 'ఇక్కడ మీరు పాన్షాయత్ విస్తరణ చట్టం (PESA) మరియు అరణ్య హక్కుల చట్టం (Forest Rights Act) గురించి సరళీకృత సమాచారం పొందవచ్చు.'
          : 'Here you can access simplified information about the PESA Act and Forest Rights Act.'}
      </Text>

      <Text style={[styles.text, { color: themeColors.text }]}>
        {language === 'Telugu'
          ? 'భూమి హక్కులు, ప్రభుత్వ సహాయం మరియు న్యాయ సేవల గురించి మీ హక్కులను తెలుసుకోండి.'
          : 'Learn about land rights, government aid, and your legal rights.'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
});

export default KnowYourRights;
