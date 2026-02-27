import { supabase } from '@/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface TravelItem {
  id: number;
  name: string;
  picture: string;
  address: string;
  description: string;
  latitude: number;
  longtitude: number;
}

export default function TravelScreen() {
  const [places, setPlaces] = useState<TravelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchTravelData();
  }, []);

  async function fetchTravelData() {
    try {
      const { data, error } = await supabase
        .from('travel')
        .select('*');

      if (error) throw error;
      if (data) setPlaces(data);
    } catch (error) {
      console.error('Error fetching travel data:', error);
    } finally {
      setLoading(false);
    }
  }

  const openMap = (lat: number, lng: number, label: string) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    Linking.canOpenURL(googleMapsUrl).then((supported) => {
      if (supported) {
        Linking.openURL(googleMapsUrl);
      } else {
        Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเปิดแผนที่ได้ในขณะนี้');
      }
    });
  };

  const toggleExpand = (id: number) => {
    // ถ้ากดอันเดิมให้ปิด ถ้ากดอันใหม่ให้เปิดอันนั้นแล้วปิดอันเก่า
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d35400" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#6A1B9A', '#FFF9C4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>สถานที่ท่องเที่ยวแนะนำ</Text>

        {places.map((item) => (
          <View key={item.id} style={styles.cardWrapper}>
            {/* ส่วนหัวกล่องที่กดได้ */}
            <TouchableOpacity 
              style={[styles.accordionHeader, expandedId === item.id && styles.noBottomRadius]} 
              onPress={() => toggleExpand(item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.headerText}>{item.name}</Text>
              <Text style={styles.icon}>{expandedId === item.id ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {/* ส่วนเนื้อหาที่จะขยายออกมา */}
            {expandedId === item.id && (
              <View style={styles.accordionContent}>
                {/* รูปภาพจาก URL ใน Database */}
                <Image source={{ uri: item.picture }} style={styles.placeImage} />
                
                <Text style={styles.subTitle}>📍 ที่อยู่:</Text>
                <Text style={styles.detailText}>{item.address}</Text>

                <View style={styles.divider} />

                <Text style={styles.subTitle}>📝 รายละเอียด:</Text>
                <Text style={styles.detailText}>{item.description}</Text>

                <View style={styles.divider} />
                
                <TouchableOpacity 
                  style={styles.mapButton}
                  onPress={() => openMap(item.latitude, item.longtitude, item.name)}
                >
                  <Text style={styles.mapButtonText}>🗺️ นำทางด้วย Google Maps</Text>
                </TouchableOpacity>
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
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 20 },
  pageTitle: {
    fontSize: 24,
    fontFamily: 'Niramit_700Bold',
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 20,
    color: '#ffffff',
  },
  cardWrapper: { 
    marginBottom: 20 
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    elevation: 3,
  },
  noBottomRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerText: {
    fontSize: 17,
    fontFamily: 'Niramit_700Bold',
    color: '#34495e',
  },
  icon: { fontSize: 14, color: '#95a5a6' },
  accordionContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 2,
  },
  placeImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: 'Niramit_700Bold',
    color: '#d35400',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Niramit_400Regular',
    color: '#555',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  mapButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  mapButtonText: {
    color: '#fff',
    fontFamily: 'Niramit_700Bold',
    fontSize: 15,
  },
});