import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

const FileGrievance: React.FC = () => {
  const [grievance, setGrievance] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const route = useRoute<RouteProp<RootStackParamList, 'FileGrievance'>>();
  const language = (route.params as { language?: string } | undefined)?.language || 'English';

  // Animation
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleSubmit = () => {
    if (!grievance.trim()) {
      Alert.alert(
        language === 'Telugu' ? 'దోషం' : 'Error',
        language === 'Telugu' ? 'దయచేసి మీ ఫిర్యాదును నమోదు చేయండి' : 'Please enter your grievance'
      );
      return;
    }

    Alert.alert(
      language === 'Telugu' ? 'విజయవంతం!' : 'Success!',
      language === 'Telugu' ? 'మీ ఫిర్యాదు విజయవంతంగా సమర్పించబడింది' : 'Your grievance has been submitted successfully'
    );
    setGrievance('');
    setName('');
    setPhone('');
    setCategory('');
  };

  const labels = {
    title: language === 'Telugu' ? 'ఫిర్యాదు చేయండి' : 'File Grievance',
    subtitle: language === 'Telugu' ? 'మీ సమస్యను నమోదు చేయండి మరియు మేము సహాయం చేస్తాము' : 'Submit your issue and we will assist you',
    name: language === 'Telugu' ? 'పూర్తి పేరు' : 'Full Name',
    phone: language === 'Telugu' ? 'ఫోన్ నంబర్' : 'Phone Number',
    category: language === 'Telugu' ? 'వర్గం' : 'Category',
    grievance: language === 'Telugu' ? 'మీ ఫిర్యాదు వివరాలు' : 'Your Grievance Details',
    grievancePlaceholder: language === 'Telugu' ? 'ఇక్కడ మీ ఫిర్యాదు టైప్ చేయండి...' : 'Type your grievance here...',
    namePlaceholder: language === 'Telugu' ? 'మీ పేరు నమోదు చేయండి' : 'Enter your name',
    phonePlaceholder: language === 'Telugu' ? 'మీ ఫోన్ నంబర్ నమోదు చేయండి' : 'Enter your phone number',
    categoryPlaceholder: language === 'Telugu' ? 'ఉదా: కుటుంబ వివాదం, ఆస్తి' : 'e.g., Family Dispute, Property',
    submit: language === 'Telugu' ? 'సమర్పించండి' : 'Submit Grievance',
    details: language === 'Telugu' ? 'వివరాలు' : 'Details',
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
          <Ionicons name="document-text-outline" size={48} color="#ffffff" style={styles.headerIcon} />
          <Text style={styles.title}>{labels.title}</Text>
          <Text style={styles.subtitle}>{labels.subtitle}</Text>
        </View>

        {/* Decorative circles */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
      </LinearGradient>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Section Header */}
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <View style={styles.titleAccent} />
                <Text style={styles.sectionTitle}>{labels.details}</Text>
              </View>
            </View>

            {/* Name Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputLabelContainer}>
                <Ionicons name="person-outline" size={20} color="#8b5cf6" />
                <Text style={styles.inputLabel}>{labels.name}</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder={labels.namePlaceholder}
                  placeholderTextColor="#94a3b8"
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Phone Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputLabelContainer}>
                <Ionicons name="call-outline" size={20} color="#8b5cf6" />
                <Text style={styles.inputLabel}>{labels.phone}</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder={labels.phonePlaceholder}
                  placeholderTextColor="#94a3b8"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Category Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputLabelContainer}>
                <Ionicons name="folder-outline" size={20} color="#8b5cf6" />
                <Text style={styles.inputLabel}>{labels.category}</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder={labels.categoryPlaceholder}
                  placeholderTextColor="#94a3b8"
                  value={category}
                  onChangeText={setCategory}
                />
              </View>
            </View>

            {/* Grievance TextArea */}
            <View style={styles.inputContainer}>
              <View style={styles.inputLabelContainer}>
                <Ionicons name="create-outline" size={20} color="#8b5cf6" />
                <Text style={styles.inputLabel}>{labels.grievance}</Text>
              </View>
              <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder={labels.grievancePlaceholder}
                  placeholderTextColor="#94a3b8"
                  multiline
                  numberOfLines={8}
                  value={grievance}
                  onChangeText={setGrievance}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Submit Button */}
            <Animated.View style={{ transform: [{ scale: scaleAnim }], marginTop: 8 }}>
              <TouchableOpacity
                onPress={handleSubmit}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
              >
                <LinearGradient
                  colors={['#8b5cf6', '#7c3aed']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitButton}
                >
                  <Ionicons name="send" size={22} color="#ffffff" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>{labels.submit}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Info Card */}
            <View style={styles.infoCard}>
              <Ionicons name="information-circle-outline" size={24} color="#ec4899" />
              <Text style={styles.infoText}>
                {language === 'Telugu'
                  ? 'మీ ఫిర్యాదు గోప్యంగా ఉంచబడుతుంది మరియు 24-48 గంటల్లో సమీక్షించబడుతుంది.'
                  : 'Your grievance will be kept confidential and reviewed within 24-48 hours.'}
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    marginBottom: 20,
    marginTop: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleAccent: {
    width: 4,
    height: 24,
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginLeft: 8,
    letterSpacing: 0.2,
  },
  inputWrapper: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  textAreaWrapper: {
    minHeight: 160,
  },
  input: {
    fontSize: 16,
    color: '#1e293b',
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontWeight: '500',
  },
  textArea: {
    minHeight: 160,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#fecdd3',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#991b1b',
    marginLeft: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
});

export default FileGrievance;