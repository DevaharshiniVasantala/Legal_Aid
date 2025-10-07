import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme'; // ✅ correct path for Expo
import { RootStackParamList } from '../navigation/AppNavigator';

// Lawyer data for both languages
const lawyersData = {
  English: [
    { id: '1', name: 'Adv. Ravi Kumar', contact: '9876543210' },
    { id: '2', name: 'Adv. Sita Rani', contact: '9123456780' },
    { id: '3', name: 'Adv. Rajesh', contact: '9988776655' },
  ],
  Telugu: [
    { id: '1', name: 'అడ్వ. రవి కుమార్', contact: '9876543210' },
    { id: '2', name: 'అడ్వ. సీత రాణి', contact: '9123456780' },
    { id: '3', name: 'అడ్వ. రాజేష్', contact: '9988776655' },
  ],
};

const FindLawyer: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'FindLawyer'>>();
  const language = (route.params as { language?: string } | undefined)?.language || 'English';

  const lawyers = language === 'Telugu' ? lawyersData.Telugu : lawyersData.English;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        {language === 'Telugu' ? 'వకీలను కనుగొనండి' : 'Find Lawyer'}
      </Text>

      <FlatList
        data={lawyers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.lawyerCard, { backgroundColor: colors.primary }]}>
            <Text style={[styles.lawyerName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.lawyerContact, { color: colors.text }]}>
              {language === 'Telugu' ? 'ఫోన్: ' : 'Phone: '}
              {item.contact}
            </Text>
          </View>
        )}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  lawyerCard: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lawyerContact: {
    fontSize: 16,
    marginTop: 5,
    color: colors.subText,
  },
});

export default FindLawyer;
