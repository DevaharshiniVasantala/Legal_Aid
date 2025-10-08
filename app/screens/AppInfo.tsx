import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const slides = [
  {
    id: '1',
    title: 'Legal Aid at Your Fingertips',
    description:
      'Access legal support and guidance specifically designed for tribal communities.',
    icon: '⚖️',
  },
  {
    id: '2',
    title: 'Know Your Rights',
    description:
      'Understand your rights under PESA and the Forest Rights Act with easy-to-follow resources.',
    icon: '📜',
  },
  {
    id: '3',
    title: 'Secure Document Management',
    description:
      'Safely store and manage all your important legal documents in one place.',
    icon: '📁',
  },
];

const AppInfo: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, []);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const skip = () => {
    navigation.navigate('LanguageSelection');
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.slide, { width }]}>
      <View style={[styles.iconContainer]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Legal Aid & Rights</Text>
        {currentIndex < slides.length - 1 && (
          <TouchableOpacity onPress={skip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Slides */}
      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onLayout={() => setCurrentIndex(0)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 30, 10],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={i.toString()}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  appTitle: { fontSize: 22, fontWeight: '700', color: '#8b5cf6' },
  skipButton: { padding: 10 },
  skipText: { fontSize: 16, fontWeight: '600', color: '#8b5cf6' },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(139, 92, 246,0.2)',
  },
  icon: { fontSize: 70 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#8b5cf6' },
  description: { fontSize: 16, textAlign: 'center', lineHeight: 24, paddingHorizontal: 20, color: '#1e293b' },
  footer: { paddingHorizontal: 20, paddingBottom: 40 },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  dot: { height: 10, borderRadius: 5, marginHorizontal: 5, backgroundColor: '#8b5cf6' },
});

export default AppInfo;
