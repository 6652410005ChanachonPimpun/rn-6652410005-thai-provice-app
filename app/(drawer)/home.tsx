import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  // สร้าง state แยกกันสำหรับแต่ละกล่องเพื่อเปิด/ปิด
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <ImageBackground
          source={require("@/assets/images/homebackground.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <Image
            source={require("@/assets/images/Tak.png")}
            style={styles.TakImage}
          />
        </ImageBackground>
      </View>
      <LinearGradient colors={["#ad02b6", "#e9fe27"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.headerTitle}>ข้อมูลจังหวัดตาก</Text>

        {/* กล่องที่ 1: คำขวัญและสัญลักษณ์ */}
        <TouchableOpacity
          style={[styles.accordionHeader, expanded1 && styles.noBottomRadius]}
          onPress={() => setExpanded1(!expanded1)}
          activeOpacity={0.8}
        >
          <Text style={styles.headerText}>✨ คำขวัญและสัญลักษณ์ประจำจังหวัด</Text>
          <Text style={styles.icon}>{expanded1 ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expanded1 && (
          <View style={styles.accordionContent}>
            <Text style={styles.subTitle}>คำขวัญ:</Text>
            <Text style={styles.detailText}>ธรรมชาติน่ายล ภูมิพลเขื่อนใหญ่ พระเจ้าตากเกรียงไกร เมืองไม้ไม้งาม</Text>
            <View style={styles.divider} />
            <Text style={styles.subTitle}>ความหมายสัญลักษณ์:</Text>
            <Text style={styles.detailText}>รูปสมเด็จพระเจ้าตากสินมหากาพย์ประทับบนพระที่นั่งสถิตบนหลังช้าง เป็นศูนย์รวมใจชาวตาก</Text>
          </View>
        )}
        {/* ------------------------------- */}
        <View style={{ height: 20 }} />
        {/* กล่องที่ 2: ประวัติศาสตร์และพหุวัฒนธรรม */}
        <TouchableOpacity
          style={[styles.accordionHeader, expanded2 && styles.noBottomRadius]}
          onPress={() => setExpanded2(!expanded2)}
          activeOpacity={0.8}
        >
          <Text style={styles.headerText}>📜 ประวัติศาสตร์และพหุวัฒนธรรม</Text>
          <Text style={styles.icon}>{expanded2 ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expanded2 && (
          <View style={styles.accordionContent}>
            <Text style={styles.subTitle}>🏛️ เมืองหน้าด่านสำคัญ:</Text>
            <Text style={styles.detailText}>
              ในสมัยสุโขทัยและอยุธยา ตากเป็นเมืองหน้าด่านที่สำคัญมากในการรับศึกทางทิศตะวันตก
              มีชื่อปรากฏในประวัติศาสตร์ว่าเป็นเมืองที่สมเด็จพระนเรศวรมหาราชทรงประกาศอิสรภาพ ณ เมืองแครง
              และมีเส้นทางเดินทัพสำคัญผ่านด่านแม่ละเมา
            </Text>

            <View style={styles.divider} />

            <Text style={styles.subTitle}>🤝 ความหลากหลายทางชาติพันธุ์:</Text>
            <Text style={styles.detailText}>
              ตากเป็นดินแดนแห่งพหุวัฒนธรรม มีกลุ่มพี่น้องชาติพันธุ์อาศัยอยู่มาก เช่น กะเหรี่ยง (ปกาเกอะญอ),
              ม้ง, มูเซอ (ลาหู่) และลีซู
              ซึ่งแต่ละกลุ่มมีวิถีชีวิตที่เป็นเอกลักษณ์ ทั้งการแต่งกาย ภาษา และประเพณีที่สืบทอดกันมาอย่างยาวนาน
            </Text>

            <View style={styles.divider} />

            <Text style={styles.subTitle}>🛡️ นามมงคล:</Text>
            <Text style={styles.detailText}>
              เดิมชื่อ เมืองระแหง เป็นเมืองเก่าแก่ที่มีอายุกว่า 2,000 ปี
              และมีความผูกพันอย่างลึกซึ้งกับประวัติศาสตร์ของสมเด็จพระเจ้าตากสินมหากาพย์
              ก่อนที่ท่านจะขึ้นครองราชย์เป็นกษัตริย์
            </Text>
          </View>
        )}
        {/* --------------------------------- */}
        <View style={{ height: 20 }} />
        {/* กล่องที่ 3: ภูมิศาสตร์และประตูสู่เศรษฐกิจโลก */}
        <TouchableOpacity
          style={[styles.accordionHeader, expanded3 && styles.noBottomRadius]}
          onPress={() => setExpanded3(!expanded3)}
          activeOpacity={0.8}
        >
          <Text style={styles.headerText}>🌍 ภูมิศาสตร์และประตูสู่เศรษฐกิจโลก</Text>
          <Text style={styles.icon}>{expanded3 ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expanded3 && (
          <View style={styles.accordionContent}>
            <Text style={styles.subTitle}>🚛 จุดเชื่อมต่อภูมิภาค (EWEC):</Text>
            <Text style={styles.detailText}>
              ตากเป็นจุดยุทธศาสตร์ในเส้นทาง East-West Economic Corridor ที่เชื่อมเมียนมา ไทย ลาว และเวียดนามเข้าด้วยกัน โดยมี สะพานมิตรภาพไทย-เมียนมา เป็นหัวใจหลัก
            </Text>

            <View style={styles.divider} />

            <Text style={styles.subTitle}>🌳 ป่าตะวันตกอันอุดมสมบูรณ์:</Text>
            <Text style={styles.detailText}>
              เป็นจังหวัดที่มีพื้นที่ป่าไม้มากที่สุดแห่งหนึ่งในไทย และเป็นส่วนหนึ่งของ ผืนป่าตะวันตก ซึ่งเป็นมรดกโลกทางธรรมชาติที่มีความหลากหลายทางชีวภาพสูงมาก
            </Text>
          </View>
        )}
      </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    height: Dimensions.get('window').height * 0.3,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TakImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
    fontFamily: 'Niramit_700Bold',
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
    fontSize: 16,
    color: '#34495e',
    fontFamily: 'Niramit_700Bold',
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
  subTitle: {
    fontSize: 15,
    color: '#d35400',
    marginBottom: 4,
    fontFamily: 'Niramit_700Bold',
  },
  detailText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
    fontFamily: 'Niramit_400Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  }
});