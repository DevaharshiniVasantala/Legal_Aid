// src/components/DashboardCard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { colors } from '../../constants/theme';

interface DashboardCardProps {
  title: string;
  onPress: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, onPress }) => {
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: themeColors.primary }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: themeColors.background }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000', // adds nice shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DashboardCard;
