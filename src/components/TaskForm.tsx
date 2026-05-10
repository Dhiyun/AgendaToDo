import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useApp } from '../context/AppContext';
import { Colors } from '../constants/Colors';
import { TaskCategory } from '../types';

interface TaskFormProps {
  category: TaskCategory;
}

const fmt = (d: Date): string => d.toISOString().split('T')[0];

const formatDisplayDate = (d: Date): string =>
  d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

export default function TaskForm({ category }: TaskFormProps) {
  const { addTask } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const isPenting = category === 'penting';
  const themeColor = isPenting ? Colors.penting : Colors.biasa;
  const themeBg = isPenting ? Colors.pentingLight : Colors.biasaLight;

  const onDateChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Perhatian', 'Judul tugas tidak boleh kosong.');
      return;
    }

    addTask({
      title: title.trim(),
      description: description.trim(),
      dueDate: fmt(dueDate),
      category,
    });

    Alert.alert(
      'Berhasil! ✅',
      `Tugas "${title.trim()}" berhasil disimpan sebagai tugas ${category}.`,
      [{ text: 'OK', onPress: () => router.back() }],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Category Badge */}
      <View style={[styles.categoryBadge, { backgroundColor: themeBg }]}>
        <Ionicons
          name={isPenting ? 'alert-circle' : 'ellipse'}
          size={14}
          color={themeColor}
        />
        <Text style={[styles.categoryText, { color: themeColor }]}>
          {isPenting ? 'PENTING' : 'BIASA'}
        </Text>
      </View>

      {/* Due Date */}
      <Text style={styles.label}>TANGGAL JATUH TEMPO</Text>
      <TouchableOpacity
        style={[styles.dateButton, { borderColor: themeColor + '50' }]}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="calendar-outline" size={20} color={themeColor} />
        <Text style={styles.dateText}>{formatDisplayDate(dueDate)}</Text>
        <Ionicons name="chevron-down" size={16} color={Colors.textMuted} />
      </TouchableOpacity>

      {/* iOS: inline picker */}
      {Platform.OS === 'ios' && showPicker && (
        <View style={styles.pickerWrapper}>
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="spinner"
            onChange={onDateChange}
            locale="id-ID"
          />
          <TouchableOpacity
            style={[styles.pickerDone, { backgroundColor: themeColor }]}
            onPress={() => setShowPicker(false)}
          >
            <Text style={styles.pickerDoneText}>Pilih Tanggal</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Android: modal picker */}
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Title */}
      <Text style={styles.label}>JUDUL TUGAS</Text>
      <TextInput
        style={[styles.input, styles.inputFocus]}
        value={title}
        onChangeText={setTitle}
        placeholder={isPenting ? 'Contoh: Submit laporan' : 'Contoh: Beli buah'}
        placeholderTextColor={Colors.textLight}
        returnKeyType="next"
        maxLength={100}
      />
      <Text style={styles.charCount}>{title.length}/100</Text>

      {/* Description */}
      <Text style={styles.label}>DESKRIPSI</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Jelaskan tugas secara singkat..."
        placeholderTextColor={Colors.textLight}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        maxLength={300}
      />
      <Text style={styles.charCount}>{description.length}/300</Text>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: themeColor }]}
        onPress={handleSave}
        activeOpacity={0.85}
      >
        <Ionicons name="save-outline" size={20} color={Colors.white} />
        <Text style={styles.saveButtonText}>SIMPAN</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
  },

  // Category
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 24,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },

  // Label
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 8,
  },

  // Date
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  pickerWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pickerDone: {
    padding: 14,
    alignItems: 'center',
  },
  pickerDoneText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },

  // Input
  input: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginBottom: 4,
  },
  inputFocus: {
    // styled via state if needed
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  charCount: {
    fontSize: 11,
    color: Colors.textLight,
    textAlign: 'right',
    marginBottom: 20,
  },

  // Save
  saveButton: {
    borderRadius: 14,
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
});
