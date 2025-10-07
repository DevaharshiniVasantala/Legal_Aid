import { RouteProp, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/theme'; // updated theme import
import { RootStackParamList } from '../navigation/AppNavigator';

interface FileInfo {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}

// Explicit type for result
type PickedDocument =
  | { type: 'cancel' }
  | { type: 'success'; uri: string; name: string; size?: number | null; mimeType?: string | null };

const UploadDocs: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const route = useRoute<RouteProp<RootStackParamList, 'UploadDocs'>>();
  const language = (route.params as { language?: string } | undefined)?.language || 'English';

  const pickDocument = async () => {
    try {
      const result: PickedDocument = await DocumentPicker.getDocumentAsync({ type: '*/*' });

      if (result.type === 'success') {
        setFiles((prevFiles) => [
          ...prevFiles,
          {
            uri: result.uri,
            name: result.name,
            size: result.size ?? undefined,
            mimeType: result.mimeType ?? undefined,
          },
        ]);
      }
    } catch (err) {
      console.log('Document pick error:', err);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>
        {language === 'Telugu' ? 'డాక్యుమెంట్లను అప్‌లోడ్ చేయండి' : 'Upload Documents'}
      </Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={pickDocument}>
        <Text style={[styles.buttonText, { color: colors.background }]}>
          {language === 'Telugu' ? 'ఫైళ్ళను ఎంచుకోండి' : 'Select Files'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <Text style={[styles.fileText, { color: colors.text }]}>
            {language === 'Telugu' ? 'ఫైల్: ' : 'File: '} {item.name}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: { padding: 15, borderRadius: 8, marginBottom: 20 },
  buttonText: { fontSize: 18, textAlign: 'center' },
  fileText: { fontSize: 16, marginBottom: 10 },
});

export default UploadDocs;
