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

interface FoodItem {
  id: number;
  name: string;
  picture: string;
  address: string;
  description: string;
  latitude: number;
  longtitude: number;
  phone: string | number;
}

export default function FoodScreen() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchFoodData();
  }, []);

  async function fetchFoodData() {
    try {
      const { data, error } = await supabase.from('food').select('*');
      if (error) throw error;
      if (data) setFoods(data);
    } catch (error) {
      console.error('Error fetching food data:', error);
    } finally {
      setLoading(false);
    }
  }

  // ฟังก์ชันเติมเลข 0 เพราะ database ไม่เก็บเลข 0
  const formatPhoneNumber = (phone: string | number) => {
      if (!phone) return "ไม่ระบุเบอร์โทรศัพท์";
      let p = phone.toString();
      return p.startsWith('0') ? p : `0${p}`;
    };
  
    const makeCall = async (phone: string | number) => {
      const formattedPhone = formatPhoneNumber(phone).replace(/[^0-9]/g, '');
      const url = `tel:${formattedPhone}`;
      try {
        await Linking.openURL(url);
      } catch (error) {
        Alert.alert('แจ้งเตือน', 'ไม่สามารถเปิดแอปโทรศัพท์ได้ในขณะนี้');
      }
    };

  const openMap = (lat: number, lng: number, label: string) => {
    const latLng = `${lat},${lng}`;
    const labelName = encodeURIComponent(label);
    const url = Platform.select({
      ios: `maps:0,0?q=${labelName}@${latLng}`,
      android: `geo:0,0?q=${latLng}(${labelName})`,
      default: `http://maps.google.com/maps?q=${latLng}`
    });
    Linking.openURL(url!);
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#e67e22" /></View>;
  }

  return (
    <LinearGradient colors={['#4B0082', '#FF8C00']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>ร้านอาหารแนะนำ</Text>

        {foods.map((item) => (
          <View key={item.id} style={styles.cardWrapper}>
            <TouchableOpacity
              style={[styles.accordionHeader, expandedId === item.id && styles.noBottomRadius]}
              onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <Text style={styles.headerText}>🍴 {item.name}</Text>
              <Text style={styles.icon}>{expandedId === item.id ? '▲' : '▼'}</Text>
            </TouchableOpacity>

            {expandedId === item.id && (
              <View style={styles.accordionContent}>
                <Image source={{ uri: item.picture }} style={styles.placeImage} />

                <Text style={styles.subTitle}>📍 ที่อยู่:</Text>
                <Text style={styles.detailText}>{item.address}</Text>

                <View style={styles.divider} />

                <Text style={styles.subTitle}>📞 เบอร์โทรศัพท์:</Text>
                <Text style={styles.detailText}>{formatPhoneNumber(item.phone)}</Text>

                <View style={styles.divider} />

                <Text style={styles.subTitle}>📝 รายละเอียด:</Text>
                <Text style={styles.detailText}>{item.description}</Text>

                <View style={styles.buttonRow}>
                  {/* ปุ่มโทรออก */}
                  <TouchableOpacity
                    style={[styles.actionButton, styles.callButton]}
                    onPress={() => makeCall(item.phone)}
                  >
                    <Text style={styles.buttonText}>📞 โทรจองโต๊ะ</Text>
                  </TouchableOpacity>

                  {/* ปุ่มแผนที่ */}
                  <TouchableOpacity
                    style={[styles.actionButton, styles.mapButton]}
                    onPress={() => openMap(item.latitude, item.longtitude, item.name)}
                  >
                    <Text style={styles.buttonText}>📍 ไปที่ร้าน</Text>
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
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: {
    padding: 20
  },
  pageTitle: {
    fontSize: 24,
    fontFamily: 'Niramit_700Bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#ffffff'
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
    elevation: 3
  },
  noBottomRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  headerText: {
    fontSize: 17,
    fontFamily: 'Niramit_700Bold',
    color: '#34495e'
  },
  icon: {
    fontSize: 14,
    color: '#95a5a6'
  },
  accordionContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 2
  },
  placeImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15
  },
  subTitle: {
    fontSize: 15,
    fontFamily: 'Niramit_700Bold',
    color: '#e67e22',
    marginBottom: 4
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Niramit_400Regular',
    color: '#555',
    lineHeight: 22
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  actionButton: {
    flex: 0.48,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  callButton: {
    backgroundColor: '#3498db'
  },
  mapButton: {
    backgroundColor: '#2ecc71'
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Niramit_700Bold',
    fontSize: 14
  },
});