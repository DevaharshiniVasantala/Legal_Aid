import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Animated,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

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

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const labels = {
    title: language === 'Telugu' ? 'వకీలను కనుగొనండి' : 'Find Lawyer',
    subtitle:
      language === 'Telugu'
        ? 'మీ ప్రాంతంలో న్యాయ నిపుణులను కనుగొనండి'
        : 'Find legal experts available in your area',
    contact: language === 'Telugu' ? 'ఫోన్' : 'Phone',
    noLawyers: language === 'Telugu' ? 'వకీలు అందుబాటులో లేరు' : 'No lawyers available',
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <LinearGradient
        colors={['#8b5cf6', '#7c3aed', '#6d28d9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Ionicons name="people-circle-outline" size={50} color="#ffffff" style={styles.headerIcon} />
          <Text style={styles.title}>{labels.title}</Text>
          <Text style={styles.subtitle}>{labels.subtitle}</Text>
        </View>

        {/* Decorative circles */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
      </LinearGradient>

      {/* Content */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <FlatList
            data={lawyers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardIcon}>
                  <Ionicons name="briefcase-outline" size={26} color="#8b5cf6" />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.lawyerName}>{item.name}</Text>
                  <Text style={styles.lawyerContact}>
                    {labels.contact}: {item.contact}
                  </Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>{labels.noLawyers}</Text>
            }
            scrollEnabled={false}
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
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
    alignItems: 'center',
    zIndex: 10,
  },
  headerIcon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    letterSpacing: 0.3,
    paddingHorizontal: 20,
  },
  decorativeCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  scroll: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardIcon: {
    backgroundColor: '#f5f3ff',
    borderRadius: 50,
    padding: 10,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  lawyerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  lawyerContact: {
    fontSize: 15,
    color: '#475569',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#64748b',
    fontSize: 16,
  },
});

export default FindLawyer;
