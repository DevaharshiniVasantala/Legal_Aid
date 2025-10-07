import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/theme';
import DashboardCard from '../component/DashboardCard';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'HomeScreen'>>();
  const { language } = route.params;

  // Labels for multilingual support
  const labels = {
    home: language === 'Telugu' ? 'హోమ్' : 'Home',
    knowRights: language === 'Telugu' ? 'మీ హక్కులు తెలుసుకోండి' : 'Know Your Rights',
    uploadDocs: language === 'Telugu' ? 'డాక్యుమెంట్లను అప్‌లోడ్ చేయండి' : 'Upload Docs',
    fileGrievance: language === 'Telugu' ? 'ఫిర్యాదు చేయండి' : 'File Grievance',
    findLawyer: language === 'Telugu' ? 'వకీలను కనుగొనండి' : 'Find Lawyer',
    logout: language === 'Telugu' ? 'లాగ్ అవుట్' : 'Log Out',
  };

  // Logout and navigate back to language selection
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LanguageSelection' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={[styles.title, { color: colors.primary }]}>{labels.home}</Text>

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: colors.primary }]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={[styles.logoutText, { color: colors.background }]}>{labels.logout}</Text>
        </TouchableOpacity>
      </View>

      {/* Dashboard Cards */}
      <DashboardCard
        title={labels.knowRights}
        onPress={() => navigation.navigate('KnowYourRights', { language })}
      />
      <DashboardCard
        title={labels.uploadDocs}
        onPress={() => navigation.navigate('UploadDocs', { language })}
      />
      <DashboardCard
        title={labels.fileGrievance}
        onPress={() => navigation.navigate('FileGrievance', { language })}
      />
      <DashboardCard
        title={labels.findLawyer}
        onPress={() => navigation.navigate('FindLawyer', { language })}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  topBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
