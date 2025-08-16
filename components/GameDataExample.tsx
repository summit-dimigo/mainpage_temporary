import { useAuth } from "@/contexts/authContext";
import { UserService } from "@/services/userService";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function GameDataExample() {
  const { user, updateUserData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // 현금 추가 (예시: 거래 성공 시)
  const addCash = async (amount: number) => {
    if (!user?.uid || !user.profile) return;
    
    setIsLoading(true);
    try {
      const newCashAmount = user.profile.cash + amount;
      const success = await UserService.updateCash(user.uid, newCashAmount);
      
      if (success) {
        await updateUserData(); // UI 새로고침
        Alert.alert("성공", `${amount.toLocaleString()}원이 추가되었습니다!`);
      } else {
        Alert.alert("오류", "현금 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error('현금 추가 실패:', error);
      Alert.alert("오류", "현금 추가 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 주식 매수 시뮬레이션
  const buyStock = async () => {
    if (!user?.uid || !user.profile) return;
    
    setIsLoading(true);
    try {
      // 예시: 애플 주식 10주 매수
      const stockPrice = 150; // $150 per share
      const quantity = 10;
      const totalCost = stockPrice * quantity * 1300; // 환율 적용 (원화)
      
      if (user.profile.cash < totalCost) {
        Alert.alert("오류", "현금이 부족합니다.");
        return;
      }
      
      // 현금 차감
      const newCash = user.profile.cash - totalCost;
      await UserService.updateCash(user.uid, newCash);
      
      // 주식 보유량 업데이트
      const newStockHoldings = [...user.profile.stockHoldings];
      const existingStock = newStockHoldings.find(stock => stock.symbol === 'AAPL');
      
      if (existingStock) {
        // 기존 보유 주식 수량 증가
        existingStock.quantity += quantity;
        existingStock.averagePrice = ((existingStock.averagePrice * (existingStock.quantity - quantity)) + (stockPrice * quantity)) / existingStock.quantity;
        existingStock.totalValue = existingStock.quantity * existingStock.currentPrice;
      } else {
        // 새로운 주식 추가
        newStockHoldings.push({
          symbol: 'AAPL',
          name: '애플',
          quantity: quantity,
          averagePrice: stockPrice,
          currentPrice: stockPrice,
          totalValue: stockPrice * quantity * 1300
        });
      }
      
      await UserService.updateStockHoldings(user.uid, newStockHoldings);
      await UserService.updateTradeStats(user.uid, 0); // 거래 횟수 증가 (손익은 0으로 시작)
      
      await updateUserData(); // UI 새로고침
      Alert.alert("성공", `애플 주식 ${quantity}주를 매수했습니다!`);
      
    } catch (error) {
      console.error('주식 매수 실패:', error);
      Alert.alert("오류", "주식 매수 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 레벨업 시뮬레이션
  const levelUp = async () => {
    if (!user?.uid || !user.profile) return;
    
    setIsLoading(true);
    try {
      const newLevel = user.profile.level + 1;
      const newExperience = user.profile.experience + 100;
      
      await UserService.updateLevel(user.uid, newLevel, newExperience);
      await updateUserData(); // UI 새로고침
      
      Alert.alert("레벨업!", `레벨 ${newLevel}이 되었습니다!`);
    } catch (error) {
      console.error('레벨업 실패:', error);
      Alert.alert("오류", "레벨업 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user?.profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>게임 데이터가 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>게임 데이터 테스트</Text>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#4CAF50' }]} 
        onPress={() => addCash(100000)}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>현금 10만원 추가</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#2196F3' }]} 
        onPress={buyStock}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>애플 주식 10주 매수</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#FF9800' }]} 
        onPress={levelUp}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>레벨업</Text>
      </TouchableOpacity>
      
      {isLoading && <Text style={styles.loading}>처리 중...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    color: '#2196F3',
    marginTop: 10,
  },
});
