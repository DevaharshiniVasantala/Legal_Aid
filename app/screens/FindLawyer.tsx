// app/screens/FindLawyer.tsx

import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { colors } from '../../constants/theme'; // ✅ updated path for Expo
import { RootStackParamList } from '../navigation/AppNavigator';

const lawyers = [
  { id: '1', name: 'Adv. Ravi Kumar', contact: '9876543210' },
  { id: '2', name: 'Adv. Sita Rani', contact: '9123456780' },
  { id: '3', name: 'Adv. Rajesh', contact: '9988776655' },
];

const FindLawyer: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'FindLawyer'>>();
  const language = (route.params as { language?: string } | undefined)?.language || 'English';

  // Select light/dark theme
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]} contentContainerStyle={{ paddingBottom: 20 }}>
      <Text style={[styles.title, { color: themeColors.primary }]}>
        {language === 'Telugu' ? 'వకీలను కనుగొనండి' : 'Find Lawyer'}
      </Text>

      <FlatList
        data={lawyers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.lawyerCard, { backgroundColor: themeColors.primary }]}>
            <Text style={[styles.lawyerName, { color: themeColors.background }]}>{item.name}</Text>
            <Text style={[styles.lawyerContact, { color: themeColors.background }]}>
              {language === 'Telugu' ? 'ఫోన్: ' : 'Phone: '}
              {item.contact}
            </Text>
          </View>
        )}
        scrollEnabled={false} // Scroll handled by parent ScrollView
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  lawyerCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lawyerContact: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default FindLawyer;
