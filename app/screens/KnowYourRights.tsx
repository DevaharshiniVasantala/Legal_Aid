import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

interface Right {
  id: string;
  title: string;
  description: string;
  category: string;
}

const KnowYourRights: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'KnowYourRights'>>();
  const language = (route.params as { language?: string } | undefined)?.language || 'English';
  const [searchQuery, setSearchQuery] = useState('');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const rightsData: Right[] = language === 'Telugu' ? [
    // Constitutional Articles
    {
      id: '1',
      title: 'ఆర్టికల్ 15(4)',
      description: 'సమాజంలో మరియు విద్యలో వెనుకబడిన వర్గాల (Scheduled Tribes సహా) అభివృద్ధికి ప్రత్యేక సౌకర్యాలు.',
      category: 'రాజ్యాంగ ఆర్టికల్స్',
    },
    {
      id: '2',
      title: 'ఆర్టికల్ 46',
      description: 'రాష్ట్రం Scheduled Castes మరియు Scheduled Tribes యొక్క విద్య మరియు ఆర్థిక హక్కులను ప్రోత్సహించి, సామాజిక అన్యాయం మరియు దుర్వినియోగం నుండి రక్షిస్తుంది.',
      category: 'రాజ్యాంగ ఆర్టికల్స్',
    },
    {
      id: '3',
      title: 'ఆర్టికల్ 164(1)',
      description: 'Scheduled Areas ఉన్న రాష్ట్రాల్లో Tribal Welfare కోసం ఒక మంత్రి నియామకం.',
      category: 'రాజ్యాంగ ఆర్టికల్స్',
    },
    {
      id: '4',
      title: 'ఆర్టికల్ 275(1)',
      description: 'రాష్ట్రాలలో Scheduled Tribes సంక్షేమం కోసం రాష్టపతి ప్రదానం చేసే గ్రాంట్లు.',
      category: 'రాజ్యాంగ ఆర్టికల్స్',
    },
    {
      id: '5',
      title: 'ఆర్టికల్ 338A',
      description: 'Scheduled Tribes కోసం జాతీయ కమిషన్ ఏర్పాటు.',
      category: 'రాజ్యాంగ ఆర్టికల్స్',
    },
    // Forest Rights Act
    {
      id: '6',
      title: 'సెక్షన్ 3(1) - అడవి హక్కుల చట్టం, 2006',
      description: 'నివాసం మరియు స్వీయ వ్యవసాయానికి అడవి భూమి పై హక్కులు.',
      category: 'అడవి హక్కుల చట్టం',
    },
    {
      id: '7',
      title: 'సెక్షన్ 3(1)(b) - అడవి హక్కుల చట్టం, 2006',
      description: 'అడవి ఉత్పత్తులను ఉపయోగించడానికి హక్కు.',
      category: 'అడవి హక్కుల చట్టం',
    },
    {
      id: '8',
      title: 'సెక్షన్ 4 - అడవి హక్కుల చట్టం, 2006',
      description: 'అడవి హక్కుల కోసం దావాల ఫైల్ చేసే ప్రక్రియ.',
      category: 'అడవి హక్కుల చట్టం',
    },
    {
      id: '9',
      title: 'సెక్షన్ 5 - అడవి హక్కుల చట్టం, 2006',
      description: 'అడవి వనరులను నిర్వహించడానికి గ్రామ సభకు అధికారాలు.',
      category: 'అడవి హక్కుల చట్టం',
    },
    // Prevention of Atrocities Act
    {
      id: '10',
      title: 'సెక్షన్ 3 - దాడుల నివారణ చట్టం, 1989',
      description: 'SC/ST సముదాయాలపై నేరాల జాబితా.',
      category: 'దాడుల నివారణ చట్టం',
    },
    {
      id: '11',
      title: 'సెక్షన్ 18 - దాడుల నివారణ చట్టం, 1989',
      description: 'నేరాల వేగవంతమైన విచారణకు ప్రత్యేక కోర్టులు.',
      category: 'దాడుల నివారణ చట్టం',
    },
    {
      id: '12',
      title: 'సెక్షన్ 19 - దాడుల నివారణ చట్టం, 1989',
      description: 'దాడులను నివారించడానికి రాష్ట్ర ప్రభుత్వాల విధులు.',
      category: 'దాడుల నివారణ చట్టం',
    },
  ] : [
    // Constitutional Articles
    {
      id: '1',
      title: 'Article 15(4)',
      description: 'Special provisions for advancement of socially and educationally backward classes, including Scheduled Tribes.',
      category: 'Constitutional Articles',
    },
    {
      id: '2',
      title: 'Article 46',
      description: 'The State shall promote the educational and economic interests of Scheduled Castes and Scheduled Tribes and protect them from social injustice and exploitation.',
      category: 'Constitutional Articles',
    },
    {
      id: '3',
      title: 'Article 164(1)',
      description: 'Appointment of a Minister in charge of tribal welfare in states having Scheduled Areas.',
      category: 'Constitutional Articles',
    },
    {
      id: '4',
      title: 'Article 275(1)',
      description: 'Grants by the President for promoting welfare of Scheduled Tribes in states.',
      category: 'Constitutional Articles',
    },
    {
      id: '5',
      title: 'Article 338A',
      description: 'Establishment of National Commission for Scheduled Tribes.',
      category: 'Constitutional Articles',
    },
    // Forest Rights Act
    {
      id: '6',
      title: 'Section 3(1) - Forest Rights Act, 2006',
      description: 'Grants title rights to forest land for habitation and self-cultivation.',
      category: 'Forest Rights Act',
    },
    {
      id: '7',
      title: 'Section 3(1)(b) - Forest Rights Act, 2006',
      description: 'Recognition of rights to use forest produce.',
      category: 'Forest Rights Act',
    },
    {
      id: '8',
      title: 'Section 4 - Forest Rights Act, 2006',
      description: 'Procedure for filing claims for forest rights.',
      category: 'Forest Rights Act',
    },
    {
      id: '9',
      title: 'Section 5 - Forest Rights Act, 2006',
      description: 'Powers of Gram Sabha to manage forest resources.',
      category: 'Forest Rights Act',
    },
    // Prevention of Atrocities Act
    {
      id: '10',
      title: 'Section 3 - Prevention of Atrocities Act, 1989',
      description: 'Lists offences against SC/ST communities.',
      category: 'Prevention of Atrocities Act',
    },
    {
      id: '11',
      title: 'Section 18 - Prevention of Atrocities Act, 1989',
      description: 'Special courts for speedy trial of offences under the Act.',
      category: 'Prevention of Atrocities Act',
    },
    {
      id: '12',
      title: 'Section 19 - Prevention of Atrocities Act, 1989',
      description: 'Duties of state governments to prevent atrocities.',
      category: 'Prevention of Atrocities Act',
    },
  ];

  const filteredRights = rightsData.filter(
    (right) =>
      right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      right.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      right.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const labels = {
    title: language === 'Telugu' ? 'మీ హక్కులు తెలుసుకోండి' : 'Know Your Rights',
    subtitle: language === 'Telugu' 
      ? 'మీ చట్టపరమైన హక్కులు మరియు రక్షణల గురించి తెలుసుకోండి' 
      : 'Learn about your legal rights and protections',
    searchPlaceholder: language === 'Telugu' ? 'హక్కులను వెతకండి...' : 'Search rights...',
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Constitutional') || category.includes('రాజ్యాంగ')) {
      return 'document-text';
    } else if (category.includes('Forest') || category.includes('అడవి')) {
      return 'leaf';
    } else {
      return 'shield-checkmark';
    }
  };

  const getCategoryColor = (category: string) => {
    if (category.includes('Constitutional') || category.includes('రాజ్యాంగ')) {
      return '#3b82f6';
    } else if (category.includes('Forest') || category.includes('అడవి')) {
      return '#10b981';
    } else {
      return '#f59e0b';
    }
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
          <Ionicons name="shield-checkmark" size={48} color="#ffffff" style={styles.headerIcon} />
          <Text style={styles.title}>{labels.title}</Text>
          <Text style={styles.subtitle}>{labels.subtitle}</Text>
        </View>

        {/* Decorative circles */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={20} color="#8b5cf6" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={labels.searchPlaceholder}
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Rights Cards */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {filteredRights.map((right, index) => (
            <View key={right.id} style={styles.card}>
              {/* Category Badge */}
              <View style={[styles.categoryBadge, { backgroundColor: `${getCategoryColor(right.category)}15` }]}>
                <Ionicons 
                  name={getCategoryIcon(right.category)} 
                  size={16} 
                  color={getCategoryColor(right.category)} 
                />
                <Text style={[styles.categoryText, { color: getCategoryColor(right.category) }]}>
                  {right.category}
                </Text>
              </View>

              {/* Title */}
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: `${getCategoryColor(right.category)}15` }]}>
                  <Ionicons name="information-circle" size={24} color={getCategoryColor(right.category)} />
                </View>
                <Text style={styles.cardTitle}>{right.title}</Text>
              </View>

              {/* Description */}
              <Text style={styles.cardDescription}>{right.description}</Text>

              {/* Bottom Accent */}
              <View style={[styles.cardAccent, { backgroundColor: getCategoryColor(right.category) }]} />
            </View>
          ))}

          {filteredRights.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={64} color="#cbd5e1" />
              <Text style={styles.emptyText}>
                {language === 'Telugu' ? 'ఫలితాలు కనుగొనబడలేదు' : 'No results found'}
              </Text>
            </View>
          )}
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    position: 'relative',
    overflow: 'hidden',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    letterSpacing: 0.3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  cardDescription: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
    fontWeight: '500',
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 16,
    fontWeight: '500',
  },
});

export default KnowYourRights;