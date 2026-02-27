import { supabase } from '@/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface TempleItem {
  id: number;
  name: string;
  picture: string;
  address: string;
  description: string;
  latitude: number;
  longtitude: number;
}

export default function TempleScreen() {
  const [temples, setTemples] = useState<TempleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchTempleData();
  }, []);

  async function fetchTempleData() {
    try {
      const { data, error } = await supabase.from('temple').select('*');
      if (error) throw error;
      if (data) setTemples(data);
    } catch (error) {
      console.error('Error fetching temple data:', error);
    } finally {
      setLoading(false);
    }
  }

  const openMap = (lat: number, lng: number, label: string) => {
    const latLng = `${lat},${lng}`;
    const labelName = encodeURIComponent(label);
    const url = Platform.select({
      ios: `maps:0,0?q=${labelName}@${latLng}`,
      android: `geo:0,0?q=${latLng}(${labelName})`,
      default: `http://googleusercontent.com/maps.google.com/4{latLng}`
    });
    if (url) Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <LinearGradient 
      colors={["#FFD700", "#FFF8DC"]}
      start={{ x: 0, y: 0 }} 
      end={{ x: 0, y: 1 }} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>วัดและศาสนสถานที่น่าสนใจ</Text>

        {temples.map((item) => (
          <View key={item.id} style={styles.cardWrapper}>
            <TouchableOpacity
              style={[styles.accordionHeader, expandedId === item.id && styles.noBottomRadius]}
              onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.headerText}>🛕 {item.name}</Text>
              <Text style={styles.icon}>{expandedId === item.id ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {expandedId === item.id && (
              <View style={styles.accordionContent}>
                <Image source={{ uri: item.picture }} style={styles.placeImage} />

                <Text style={styles.subTitle}>📍 ที่ตั้ง:</Text>
                <Text style={styles.detailText}>{item.address}</Text>

                <View style={styles.divider} />

                <Text style={styles.subTitle}>📜 ประวัติและรายละเอียด:</Text>
                <Text style={styles.detailText}>{item.description}</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.mapButton]}
                    onPress={() => openMap(item.latitude, item.longtitude, item.name)}
                  >
                    <Text style={styles.buttonText}>📍 นำทางด้วยแผนที่</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20, paddingTop: 50 },
  pageTitle: { 
    fontSize: 24, 
    fontFamily: 'Niramit_700Bold', 
    textAlign: 'center', 
    marginBottom: 25, 
    color: '#8B4513',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    shadowRadius: 3
  },
  cardWrapper: { marginBottom: 20 },
  accordionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    padding: 18, 
    borderRadius: 15,
    elevation: 4
  },
  noBottomRadius: {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
},

headerText: {
  fontSize: 17,
  fontFamily: 'Niramit_700Bold',
  color: '#5D4037',
},

icon: {
  fontSize: 14,
  color: '#8D6E63',
},

accordionContent: {
  backgroundColor: '#fff',
  padding: 15,
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  borderTopWidth: 1,
  borderTopColor: '#F5F5F5',
  elevation: 2,
},

divider: {
  height: 1,
  backgroundColor: '#EEE',
  marginVertical: 12,
},

placeImage: {
  width: '100%',
  height: 200,
  borderRadius: 12,
  marginBottom: 15,
},

subTitle: {
  fontSize: 15,
  fontFamily: 'Niramit_700Bold',
  color: '#B8860B',
  marginBottom: 4,
},

detailText: {
  fontSize: 14,
  fontFamily: 'Niramit_400Regular',
  color: '#444',
  lineHeight: 22,
},

buttonRow: {
  marginTop: 10,
},

actionButton: {
  width: '100%',
  padding: 13,
  borderRadius: 10,
  alignItems: 'center',
},

mapButton: {
  backgroundColor: '#2ecc71',
},

buttonText: {
  color: '#fff',
  fontFamily: 'Niramit_700Bold',
  fontSize: 15,
},
});