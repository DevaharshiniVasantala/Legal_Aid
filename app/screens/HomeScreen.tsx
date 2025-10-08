import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DashboardCard from '../component/DashboardCard';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'HomeScreen'>>();
  const { language } = route.params;

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Labels for multilingual support
  const labels = {
    home: language === 'Telugu' ? 'హోమ్' : 'Home',
    welcome: language === 'Telugu' ? 'స్వాగతం' : 'Welcome',
    subtitle: language === 'Telugu' ? 'మీ చట్టపరమైన సహాయకుడు' : 'Your Legal Companion',
    knowRights: language === 'Telugu' ? 'మీ హక్కులు తెలుసుకోండి' : 'Know Your Rights',
    uploadDocs: language === 'Telugu' ? 'డాక్యుమెంట్లను అప్‌లోడ్ చేయండి' : 'Upload Docs',
    digitalLocker: language === 'Telugu' ? 'డిజిటల్ లాకర్' : 'Digital Locker',
    fileGrievance: language === 'Telugu' ? 'ఫిర్యాదు చేయండి' : 'File Grievance',
    findLawyer: language === 'Telugu' ? 'వకీలను కనుగొనండి' : 'Find Lawyer',
    trackGrievance: language === 'Telugu' ? 'ఫిర్యాదు ట్రాక్ చేయండి' : 'Track Grievance',
    logout: language === 'Telugu' ? 'లాగ్ అవుట్' : 'Log Out',
    quickActions: language === 'Telugu' ? 'త్వరిత చర్యలు' : 'Quick Actions',
  };

  // Logout and navigate back to language selection
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LanguageSelection' }],
    });
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with Gradient Background */}
      <LinearGradient
        colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Animated.View 
            style={{ 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            <Text style={styles.welcomeText}>{labels.welcome}</Text>
            <Text style={styles.headerTitle}>{labels.home}</Text>
            <Text style={styles.subtitle}>{labels.subtitle}</Text>
          </Animated.View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutText}>{labels.logout}</Text>
          </TouchableOpacity>
        </View>
        
        {/* Decorative elements */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
        <View style={[styles.decorativeCircle, styles.circle3]} />
        
        {/* Wave pattern at bottom */}
        <View style={styles.waveContainer}>
          <View style={styles.wave} />
        </View>
      </LinearGradient>

      {/* Dashboard Cards Section */}
      <ScrollView 
        contentContainerStyle={styles.cardsContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <Animated.View 
          style={{ 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            width: '100%',
            alignItems: 'center'
          }}
        >
          {/* Section Title */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <View style={styles.titleAccent} />
              <Text style={styles.sectionTitle}>{labels.quickActions}</Text>
            </View>
          </View>

          {/* Cards Grid */}
          <View style={styles.cardsGrid}>
            <DashboardCard
              title={labels.knowRights}
              onPress={() => navigation.navigate('KnowYourRights', { language })}
            />
            <DashboardCard
              title={labels.uploadDocs}
              onPress={() => navigation.navigate('UploadDocs', { language })}
            />
            <DashboardCard
              title={labels.digitalLocker}
              onPress={() => navigation.navigate('DigitalLocker')}
            />
            <DashboardCard
              title={labels.fileGrievance}
              onPress={() => navigation.navigate('FileGrievance', { language })}
            />
            <DashboardCard
              title={labels.findLawyer}
              onPress={() => navigation.navigate('FindLawyer', { language })}
            />
            <DashboardCard
              title={labels.trackGrievance}
              onPress={() => navigation.navigate('TrackGrievance', { language })}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  headerContent: {
    zIndex: 10,
    position: 'relative',
  },
  welcomeText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
    marginBottom: 6,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  logoutButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  decorativeCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle1: { width: 220, height: 220, top: -100, right: -70 },
  circle2: { width: 160, height: 160, bottom: -50, left: -60 },
  circle3: { width: 100, height: 100, top: 100, right: 30, backgroundColor: 'rgba(255, 255, 255, 0.05)' },
  waveContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 30, overflow: 'hidden' },
  wave: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 30, backgroundColor: '#f1f5f9', borderTopLeftRadius: 50, borderTopRightRadius: 50 },
  cardsContainer: { paddingTop: 32, paddingBottom: 30, paddingHorizontal: 20, alignItems: 'center' },
  sectionHeader: { width: '100%', marginBottom: 24 },
  sectionTitleContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 },
  titleAccent: { width: 4, height: 24, backgroundColor: '#7c3aed', borderRadius: 2, marginRight: 12 },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#1e293b', letterSpacing: 0.3 },
  cardsGrid: { width: '100%', alignItems: 'center' },
});

export default HomeScreen;
