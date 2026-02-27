import { supabase } from '@/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

interface TraditionItem {
  name: string;
  picture: string;
  description: string;
  date: string;
}

export default function TraditionScreen() {
  const [data, setData] = useState<TraditionItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTradition();
  }, []);

  async function fetchTradition() {
    try {
      const { data, error } = await supabase.from('tradition').select('*').single();
      if (error) throw error;
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#d35400" /></View>;

  return (
    <ScrollView style={styles.container} bounces={false}>
      {/* 1. ส่วนรูปภาพหัวข้อ */}
      <Image source={{ uri: data?.picture }} style={styles.heroImage} />
      
      {/* 2. ส่วนเนื้อหา */}
      <View style={styles.contentCard}>
        <LinearGradient colors={['#FF9800', '#F57C00']} style={styles.categoryTag}>
          <Text style={styles.tagText}>ประเพณีแนะนำ</Text>
        </LinearGradient>

        <Text style={styles.title}>{data?.name}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>📅 {data?.date || 'จัดเป็นประจำทุกปี'}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>ความเป็นมาและกิจกรรม</Text>
        <Text style={styles.description}>{data?.description}</Text>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heroImage: { width: width, height: 300 },
  contentCard: {
    marginTop: -30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    minHeight: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  tagText: { color: '#fff', fontFamily: 'Niramit-Bold', fontSize: 12 },
  title: { fontSize: 28, fontFamily: 'Niramit-Bold', color: '#333', marginBottom: 10 },
  infoRow: { marginBottom: 20 },
  infoText: { fontSize: 15, fontFamily: 'Niramit-Regular', color: '#666' },
  divider: { height: 1, backgroundColor: '#eee', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontFamily: 'Niramit-Bold', color: '#F57C00', marginBottom: 10 },
  description: { fontSize: 16, fontFamily: 'Niramit-Regular', color: '#444', lineHeight: 26 },
});