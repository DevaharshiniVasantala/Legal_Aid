import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { colors } from '../../constants/theme'; // ✅ updated path for Expo
import { RootStackParamList } from '../navigation/AppNavigator';

const FileGrievance: React.FC = () => {
  const [grievance, setGrievance] = useState('');
  const route = useRoute<RouteProp<RootStackParamList, 'FileGrievance'>>();
  const language = (route.params as { language?: string } | undefined)?.language || 'English';

  const handleSubmit = () => {
    Alert.alert(
      language === 'Telugu' ? 'ఫిర్యాదు సమర్పించబడింది!' : 'Grievance Submitted!'
    );
    setGrievance('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.text }]}>
          {language === 'Telugu' ? 'ఫిర్యాదు చేయండి' : 'File Grievance'}
        </Text>

        <TextInput
          style={[
            styles.input,
            { borderColor: colors.primary, color: colors.text },
          ]}
          placeholder={
            language === 'Telugu'
              ? 'ఇక్కడ మీ ఫిర్యాదు టైప్ చేయండి'
              : 'Type your grievance here'
          }
          placeholderTextColor={colors.subText}
          multiline
          numberOfLines={6}
          value={grievance}
          onChangeText={setGrievance}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>
            {language === 'Telugu' ? 'సమర్పించండి' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    marginBottom: 25,
    backgroundColor: '#FFFFFF',
    minHeight: 150,
  },
  button: {
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default FileGrievance;
