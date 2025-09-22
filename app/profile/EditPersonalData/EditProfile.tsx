import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';

const EditProfileScreen = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Financial enthusiast and money tracker',
  });

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    Alert.alert('Cancel', 'Changes will be discarded');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Profile Picture</Text>
        <View style={styles.profilePictureContainer}>
          <View style={[styles.profilePicture, { backgroundColor: `${colors.primary}20` }]}>
            <Ionicons name='person' size={40} color={colors.primary} />
          </View>
          <TouchableOpacity
            style={[styles.changePictureButton, { backgroundColor: colors.primary }]}
            onPress={() => Alert.alert('Change Picture', 'Photo picker coming soon!')}
          >
            <Text style={[styles.changePictureText, { color: colors.onPrimary }]}>
              Change Picture
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Personal Information</Text>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurface }]}>Full Name</Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.onSurface,
              },
            ]}
            value={formData.name}
            onChangeText={text => setFormData({ ...formData, name: text })}
            placeholder='Enter your full name'
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurface }]}>Email</Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.onSurface,
              },
            ]}
            value={formData.email}
            onChangeText={text => setFormData({ ...formData, email: text })}
            placeholder='Enter your email'
            placeholderTextColor={colors.textSecondary}
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurface }]}>Phone Number</Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.onSurface,
              },
            ]}
            value={formData.phone}
            onChangeText={text => setFormData({ ...formData, phone: text })}
            placeholder='Enter your phone number'
            placeholderTextColor={colors.textSecondary}
            keyboardType='phone-pad'
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurface }]}>Bio</Text>
          <TextInput
            style={[
              styles.textInput,
              styles.textArea,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.onSurface,
              },
            ]}
            value={formData.bio}
            onChangeText={text => setFormData({ ...formData, bio: text })}
            placeholder='Tell us about yourself'
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={3}
          />
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[
            styles.cancelButton,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          onPress={handleCancel}
        >
          <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: colors.onPrimary }]}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default EditProfileScreen;
