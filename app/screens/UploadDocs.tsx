import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Animated, Dimensions, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

interface FileInfo {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}

type PickedDocument =
  | { type: 'cancel' }
  | { type: 'success'; uri: string; name: string; size?: number | null; mimeType?: string | null };

const UploadDocs: React.FC = () => {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const route = useRoute<RouteProp<RootStackParamList, 'UploadDocs'>>();
  const language = (route.params as { language?: string } | undefined)?.language || 'English';

  // Animation
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

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

  const removeFile = (uri: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.uri !== uri));
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

  const labels = {
    title: language === 'Telugu' ? 'డాక్యుమెంట్లను అప్‌లోడ్ చేయండి' : 'Upload Documents',
    subtitle: language === 'Telugu' ? 'మీ చట్టపరమైన పత్రాలను సురక్షితంగా నిల్వ చేయండి' : 'Store your legal documents securely',
    selectFiles: language === 'Telugu' ? 'ఫైళ్ళను ఎంచుకోండి' : 'Select Files',
    uploadedFiles: language === 'Telugu' ? 'అప్‌లోడ్ చేసిన ఫైళ్ళు' : 'Uploaded Files',
    noFiles: language === 'Telugu' ? 'ఇంకా ఫైళ్ళు లేవు' : 'No files uploaded yet',
    tapToUpload: language === 'Telugu' ? 'డాక్యుమెంట్లు జోడించడానికి క్లిక్ చేయండి' : 'Tap the button above to add documents',
    file: language === 'Telugu' ? 'ఫైల్: ' : 'File: ',
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
          <Ionicons name="cloud-upload-outline" size={48} color="#ffffff" style={styles.headerIcon} />
          <Text style={styles.title}>{labels.title}</Text>
          <Text style={styles.subtitle}>{labels.subtitle}</Text>
        </View>
        
        {/* Decorative circles */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
      </LinearGradient>

      {/* Upload Button */}
      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            onPress={pickDocument}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
          >
            <LinearGradient
              colors={['#8b5cf6', '#7c3aed']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.uploadButton}
            >
              <Ionicons name="add-circle-outline" size={24} color="#ffffff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>{labels.selectFiles}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Files List Section */}
      <View style={styles.filesSection}>
        <View style={styles.filesSectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <View style={styles.titleAccent} />
            <Text style={styles.sectionTitle}>{labels.uploadedFiles}</Text>
          </View>
          {files.length > 0 && (
            <View style={styles.fileCount}>
              <Text style={styles.fileCountText}>{files.length}</Text>
            </View>
          )}
        </View>

        {files.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={80} color="#cbd5e1" />
            <Text style={styles.emptyStateTitle}>{labels.noFiles}</Text>
            <Text style={styles.emptyStateSubtitle}>{labels.tapToUpload}</Text>
          </View>
        ) : (
          <FlatList
            data={files}
            keyExtractor={(item) => item.uri}
            contentContainerStyle={styles.filesList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Animated.View 
                style={[
                  styles.fileCard,
                  { 
                    opacity: 1,
                    transform: [{ translateY: 0 }]
                  }
                ]}
              >
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
              </Animated.View>
            )}
          />
        )}
      </View>
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
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  uploadButton: {
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
  filesSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filesSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  fileCount: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fileCountText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  filesList: {
    paddingBottom: 20,
  },
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
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  fileSize: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
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

export default UploadDocs;