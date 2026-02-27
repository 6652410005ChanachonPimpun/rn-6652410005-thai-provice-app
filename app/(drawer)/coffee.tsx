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

interface CoffeeItem {
  id: number;
  name: string;
  picture: string;
  address: string;
  description: string;
  latitude: number;
  longtitude: number;
  phone: string | number;
}

export default function CoffeeScreen() {
  const [shops, setShops] = useState<CoffeeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchCoffeeData();
  }, []);

  async function fetchCoffeeData() {
    try {
      const { data, error } = await supabase.from('coffee').select('*');
      if (error) throw error;
      if (data) setShops(data);
    } catch (error) {
      console.error('Error fetching coffee data:', error);
    } finally {
      setLoading(false);
    }
  }

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
      default: `http://maps.google.com/?q=${latLng}`
    });
    Linking.openURL(url!);
  };

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#6F4E37" /></View>;
  }

  return (
    <LinearGradient colors={['#21130D', '#8D6E63']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>คาเฟ่และร้านกาแฟ</Text>

        {shops.map((item) => (
          <View key={item.id} style={styles.cardWrapper}>
            <TouchableOpacity
              style={[styles.accordionHeader, expandedId === item.id && styles.noBottomRadius]}
              onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.headerText}>☕ {item.name}</Text>
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
                  <TouchableOpacity
                    style={[styles.actionButton, styles.callButton]}
                    onPress={() => makeCall(item.phone)}
                  >
                    <Text style={styles.buttonText}>📞 โทรติดต่อ</Text>
                  </TouchableOpacity>

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
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingVertical: 25 },
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noBottomRadius: {
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  },
  headerText: {
    fontSize: 17,
    fontFamily: 'Niramit_700Bold',
    color: '#3e2723',
  },
  icon: {
    fontSize: 14,
    color: '#95a5a6',
  },
  accordionContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
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
    color: '#8d6e63',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Niramit_400Regular',
    color: '#5d4037',
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    flex: 0.47,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    backgroundColor: '#795548',
  },
  mapButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Niramit_700Bold',
    fontSize: 14,
  },
});