import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

interface FileInfo {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}

const mockFiles: FileInfo[] = [
  { uri: 'file1.pdf', name: 'Property Document.pdf', size: 1048576, mimeType: 'application/pdf' },
  { uri: 'file2.jpg', name: 'Land Photo.jpg', size: 512000, mimeType: 'image/jpeg' },
  { uri: 'file3.pdf', name: 'Legal Notice.pdf', size: 204800, mimeType: 'application/pdf' },
];

const DigitalLocker: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>(mockFiles);
  const route = useRoute<RouteProp<RootStackParamList, 'DigitalLocker'>>();
  const language = route.params?.language || 'English';

  const labels = {
    title: language === 'Telugu' ? 'డిజిటల్ లాకర్' : 'Digital Locker',
    subtitle: language === 'Telugu' ? 'మీ ఫైళ్ళను సురక్షితంగా వీక్షించండి' : 'View your documents securely',
    noFiles: language === 'Telugu' ? 'లాక్‌లో ఫైళ్ళు లేవు' : 'No files in the locker',
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getFileIcon = (mimeType?: string) => {
    if (!mimeType) return 'document-outline';
    if (mimeType.includes('pdf')) return 'document-text';
    if (mimeType.includes('image')) return 'image';
    if (mimeType.includes('video')) return 'videocam';
    if (mimeType.includes('audio')) return 'musical-notes';
    if (mimeType.includes('zip') || mimeType.includes('rar')) return 'archive';
    return 'document-outline';
  };

  const removeFile = (uri: string) => {
    setFiles(prev => prev.filter(file => file.uri !== uri));
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
          <Ionicons name="lock-closed-outline" size={48} color="#ffffff" style={styles.headerIcon} />
          <Text style={styles.title}>{labels.title}</Text>
          <Text style={styles.subtitle}>{labels.subtitle}</Text>
        </View>

        {/* Decorative circles */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
      </LinearGradient>

      {/* Files List Section */}
      <View style={styles.filesSection}>
        {files.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={80} color="#cbd5e1" />
            <Text style={styles.emptyStateTitle}>{labels.noFiles}</Text>
          </View>
        ) : (
          <FlatList
            data={files}
            keyExtractor={item => item.uri}
            contentContainerStyle={styles.filesList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.fileCard}>
                <View style={styles.fileIconContainer}>
                  <Ionicons name={getFileIcon(item.mimeType)} size={28} color="#8b5cf6" />
                </View>

                <View style={styles.fileInfo}>
                  <Text style={styles.fileName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.fileSize}>{formatFileSize(item.size)}</Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeFile(item.uri)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

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
  headerContent: { alignItems: 'center', zIndex: 10 },
  headerIcon: { marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800', color: '#ffffff', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.9)', textAlign: 'center' },
  decorativeCircle: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1000 },
  circle1: { width: 180, height: 180, top: -60, right: -50 },
  circle2: { width: 120, height: 120, bottom: -30, left: -40 },
  filesSection: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 60 },
  emptyStateTitle: { fontSize: 20, fontWeight: '600', color: '#64748b', marginTop: 20 },
  filesList: { paddingBottom: 20 },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  fileIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  fileInfo: { flex: 1 },
  fileName: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 4 },
  fileSize: { fontSize: 13, color: '#64748b', fontWeight: '500' },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});

export default DigitalLocker;
