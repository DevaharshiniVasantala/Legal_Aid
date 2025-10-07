import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { colors } from '../../constants/theme';
import DashboardCard from '../component/DashboardCard';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'HomeScreen'>>();
  const { language } = route.params;

  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  const labels = {
    knowRights: language === 'Telugu' ? 'మీ హక్కులు తెలుసుకోండి' : 'Know Your Rights',
    uploadDocs: language === 'Telugu' ? 'డాక్యుమెంట్లను అప్‌లోడ్ చేయండి' : 'Upload Docs',
    fileGrievance: language === 'Telugu' ? 'ఫిర్యాదు చేయండి' : 'File Grievance',
    findLawyer: language === 'Telugu' ? 'వకీలను కనుగొనండి' : 'Find Lawyer',
    logout: language === 'Telugu' ? 'లాగ్ అవుట్' : 'Log Out',
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LanguageSelection' }],
    });
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={[styles.title, { color: themeColors.primary }]}>
          {language === 'Telugu' ? 'హోమ్' : 'Home'}
        </Text>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: themeColors.primary }]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Text style={[styles.logoutText, { color: themeColors.background }]}>{labels.logout}</Text>
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
    paddingVertical: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  topBar: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
