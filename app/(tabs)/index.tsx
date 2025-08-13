import { Image } from "expo-image";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Logo = require('../../assets/images/summit-logo.png');

export default function Index() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <TouchableOpacity style={styles.notificationBtn}>
          <Text style={styles.notificationText}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* 배너 */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>배너</Text>
        </View>

        {/* 수익 정보 */}
        <View style={styles.profitSection}>
          <Text style={styles.profitLabel}>황인성님의 전체 수익은</Text>
          <Text style={styles.profitAmount}>+231,309<Text style={styles.profitUnit}>원 입니다</Text></Text>
        </View>

        {/* 총 자산 */}
        <View style={styles.totalAssetSection}>
          <Text style={styles.totalAssetLabel}>내 주식</Text>
          <Text style={styles.totalAssetAmount}>5,810,294</Text>
        </View>

        {/* 국내 주식 */}
        <View style={styles.stockSection}>
          <Text style={styles.sectionTitle}>국내 주식</Text>
          
          <TouchableOpacity style={styles.stockItem}>
            <View style={styles.stockInfo}>
              <View style={styles.stockIcon}>
                <Text style={styles.stockIconText}>JYP</Text>
              </View>
              <View style={styles.stockDetails}>
                <Text style={styles.stockName}>JYP Ent.</Text>
                <Text style={styles.stockShares}>4주</Text>
              </View>
            </View>
            <View style={styles.stockPrice}>
              <Text style={styles.stockPriceText}>319,200원</Text>
              <Text style={styles.stockChange}>+18,000원(+7%)</Text>
            </View>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.stockItem}>
            <View style={styles.stockInfo}>
              <View style={styles.stockIcon}>
                <Text style={styles.stockIconText}>JYP</Text>
              </View>
              <View style={styles.stockDetails}>
                <Text style={styles.stockName}>JYP Ent.</Text>
                <Text style={styles.stockShares}>4주</Text>
              </View>
            </View>
            <View style={styles.stockPrice}>
              <Text style={styles.stockPriceText}>319,200원</Text>
              <Text style={styles.stockChange}>+18,000원(+7%)</Text>
            </View>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.stockItem}>
            <View style={styles.stockInfo}>
              <View style={styles.stockIcon}>
                <Text style={styles.stockIconText}>JYP</Text>
              </View>
              <View style={styles.stockDetails}>
                <Text style={styles.stockName}>JYP Ent.</Text>
                <Text style={styles.stockShares}>4주</Text>
              </View>
            </View>
            <View style={styles.stockPrice}>
              <Text style={styles.stockPriceText}>319,200원</Text>
              <Text style={styles.stockChange}>+18,000원(+7%)</Text>
            </View>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* 해외 주식 */}
        <View style={styles.stockSection}>
          <Text style={styles.sectionTitle}>해외 주식</Text>
          
          <TouchableOpacity style={styles.stockItem}>
            <View style={styles.stockInfo}>
              <View style={styles.stockIcon}>
                <Text style={styles.stockIconText}>JYP</Text>
              </View>
              <View style={styles.stockDetails}>
                <Text style={styles.stockName}>JYP Ent.</Text>
                <Text style={styles.stockShares}>4주</Text>
              </View>
            </View>
            <View style={styles.stockPrice}>
              <Text style={styles.stockPriceText}>319,200원</Text>
              <Text style={styles.stockChange}>+18,000원(+7%)</Text>
            </View>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  notificationBtn: {
    padding: 8,
  },
  notificationText: {
    fontSize: 20,
    color: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  banner: {
    height: 120,
    backgroundColor: '#333',
    margin: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    color: '#fff',
    fontSize: 18,
  },
  profitSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profitLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  profitAmount: {
    color: '#ff4444',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profitUnit: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
  },
  totalAssetSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  totalAssetLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  totalAssetAmount: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  stockSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  stockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  stockInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4a9eff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stockIconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stockDetails: {
    flex: 1,
  },
  stockName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockShares: {
    color: '#aaa',
    fontSize: 14,
  },
  stockPrice: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  stockPriceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockChange: {
    color: '#4a9eff',
    fontSize: 12,
  },
  arrow: {
    color: '#aaa',
    fontSize: 16,
  },
});