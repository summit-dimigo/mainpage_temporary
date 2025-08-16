import { useAuth } from "@/contexts/authContext";
import { router } from "expo-router";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPage() {
  const { user, logout, isLoading, updateUserData } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      console.log('로그아웃 완료');
      router.replace('../login');
    }
  };

  const handleRefresh = async () => {
    await updateUserData();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>로딩 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>마이 페이지</Text>

          {user && user?.profile ? (
            <>
              {/* 기본 정보 */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>계정 정보</Text>
                <View style={styles.userInfo}>
                  <Text style={styles.userInfoText}>이메일: {user.email}</Text>
                  <Text style={styles.userInfoText}>name: {user.name}</Text>
                  <Text style={styles.userInfoText}>이름: {user.profile.name}</Text>
                  <Text style={styles.userInfoText}>UID: {user.uid}</Text>
                </View>
              </View>

              {/* 게임 데이터 */}
              {user.profile ? (
                <>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>게임 정보</Text>
                    <View style={styles.gameInfo}>
                      <Text style={styles.gameInfoText}>Namae: {user.profile.name}</Text>
                      <Text style={styles.gameInfoText}>레벨: {user.profile.level}</Text>
                      <Text style={styles.gameInfoText}>경험치: {user.profile.experience}</Text>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>자산 현황</Text>
                    <View style={styles.assetInfo}>
                      <Text style={styles.assetText}>현금: {user.profile.cash.toLocaleString()}원</Text>
                      <Text style={styles.assetText}>총 자산: {user.profile.totalAssets.toLocaleString()}원</Text>
                      <Text style={styles.assetText}>보유 주식: {user.profile.stockHoldings.length}개</Text>
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>거래 통계</Text>
                    <View style={styles.statsInfo}>
                      <Text style={styles.statsText}>총 거래 횟수: {user.profile.totalTrades}회</Text>
                      <Text style={[styles.statsText, { color: user.profile.profitLoss >= 0 ? '#4CAF50' : '#F44336' }]}>
                        총 손익: {user.profile.profitLoss >= 0 ? '+' : ''}{user.profile.profitLoss.toLocaleString()}원
                      </Text>
                      <Text style={styles.statsText}>승률: {user.profile.winRate.toFixed(1)}%</Text>
                    </View>
                  </View>

                  {/* 보유 주식 목록 */}
                  {user.profile.stockHoldings.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>보유 주식</Text>
                      <View style={styles.stockList}>
                        {user.profile.stockHoldings.slice(0, 3).map((stock, index) => (
                          <View key={index} style={styles.stockItem}>
                            <Text style={styles.stockName}>{stock.name} ({stock.symbol})</Text>
                            <Text style={styles.stockDetails}>
                              {stock.quantity}주 × {stock.currentPrice.toLocaleString()}원 = {stock.totalValue.toLocaleString()}원
                            </Text>
                          </View>
                        ))}
                        {user.profile.stockHoldings.length > 3 && (
                          <Text style={styles.moreStocks}>외 {user.profile.stockHoldings.length - 3}개 종목</Text>
                        )}
                      </View>
                    </View>
                  )}
                </>
              ) : (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>게임 데이터</Text>
                  <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>게임 데이터가 없습니다.</Text>
                    <Text style={styles.noDataSubText}>게임을 시작하면 자동으로 프로필이 생성됩니다.</Text>
                  </View>
                </View>
              )}
            </>
          ) : (
            <Text>로그인 정보가 없습니다.</Text>
          )}

          <View style={styles.buttonContainer}>
            {user?.profile && (
              <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
                <Text style={styles.refreshButtonText}>데이터 새로고침</Text>
              </TouchableOpacity>
            )}
            <Button 
              title={user ? "로그아웃" : "로그인"}
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  userInfo: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  gameInfo: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
  },
  gameInfoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1976d2',
  },
  assetInfo: {
    backgroundColor: '#e8f5e8',
    padding: 15,
    borderRadius: 10,
  },
  assetText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2e7d32',
    fontWeight: '500',
  },
  statsInfo: {
    backgroundColor: '#fff3e0',
    padding: 15,
    borderRadius: 10,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#ef6c00',
  },
  stockList: {
    backgroundColor: '#f3e5f5',
    padding: 15,
    borderRadius: 10,
  },
  stockItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7b1fa2',
  },
  stockDetails: {
    fontSize: 14,
    color: '#7b1fa2',
    marginTop: 2,
  },
  moreStocks: {
    fontSize: 14,
    color: '#7b1fa2',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  noDataContainer: {
    backgroundColor: '#fafafa',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  noDataSubText: {
    fontSize: 14,
    color: '#999',
  },
  buttonContainer: {
    marginTop: 20,
  },
  refreshButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});