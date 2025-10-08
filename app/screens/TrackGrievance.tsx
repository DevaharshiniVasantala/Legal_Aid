import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'TrackGrievance'>;

interface Grievance {
  id: string;
  title: string;
  status: string;
  date: string;
}

const mockGrievances: Grievance[] = [
  { id: '1', title: 'Land Dispute', status: 'Pending', date: '2025-10-05' },
  { id: '2', title: 'Forest Rights Claim', status: 'In Progress', date: '2025-10-06' },
  { id: '3', title: 'Illegal Eviction', status: 'Resolved', date: '2025-10-01' },
];

const TrackGrievance: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const language = route.params?.language || 'English';

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const labels = {
    title: language === 'Telugu' ? 'ఫిర్యాదు ట్రాక్ చేయండి' : 'Track Your Grievance',
    searchPlaceholder:
      language === 'Telugu' ? 'ఫిర్యాదు ID లేదా శీర్షికను ఎంటర్ చేయండి' : 'Enter Grievance ID or Title',
    status: language === 'Telugu' ? 'స్థితి' : 'Status',
    date: language === 'Telugu' ? 'తేదీ' : 'Date',
  };

  const filteredGrievances = mockGrievances.filter(
    g =>
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.id.includes(searchQuery)
  );

  const renderGrievance = ({ item }: { item: Grievance }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.cardDetails}>
        <Text style={styles.cardText}>
          {labels.status}: {item.status}
        </Text>
        <Text style={styles.cardText}>
          {labels.date}: {item.date}
        </Text>
      </View>
    </View>
  );

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
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.headerTitle}>{labels.title}</Text>
        </Animated.View>

        {/* Decorative circles */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
      </LinearGradient>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={labels.searchPlaceholder}
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Grievances List */}
        <FlatList
          data={filteredGrievances}
          renderItem={renderGrievance}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  decorativeCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 1000,
  },
  circle1: { width: 180, height: 180, top: -60, right: -50 },
  circle2: { width: 120, height: 120, bottom: -30, left: -40 },
  content: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 20 },
  searchContainer: { marginBottom: 20 },
  searchInput: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    backgroundColor: '#9880cf',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b', marginBottom: 8 },
  cardDetails: { flexDirection: 'row', justifyContent: 'space-between' },
  cardText: { fontSize: 14, color: '#1e293b' },
});

export default TrackGrievance;
