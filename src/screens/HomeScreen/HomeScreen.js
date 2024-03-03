import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

const DayItem = ({ day, date,isSelected, onSelect }) => {
  const style = isSelected ? styles.dayItemSelected : styles.dayItem;
  return (
    <TouchableOpacity onPress={() => onSelect(day)} style={style.container}>
      <Text style={style.day}>{day}</Text>
      <Text style={style.date}>{date}</Text>
    </TouchableOpacity>
  );
};

const MealRecordCard = ({ mealName, stats, src }) => (
  <View style={styles.mealRecordCard}>
    <View>
      <Text style={styles.mealRecordTitle}>{mealName}</Text>
      <Text style={styles.mealRecordStats}>{stats}</Text>
    </View>
    {/* <Image source={{ uri: src }} style={styles.mealRecordImage} /> */}
  </View>
);

const FitnessTrackerApp = () => {
  const dailyStatistics = [
    { day: 'M', date: '16', isActive: false },
    { day: 'T', date: '17', isActive: false },
    { day: 'W', date: '18', isActive: true },
    { day: 'T', date: '19', isActive: false },
    { day: 'F', date: '20', isActive: false },
    { day: 'S', date: '21', isActive: false },
    { day: 'S', date: '22', isActive: false },
  ];

  const mealRecords = [
    { mealName: 'Breakfast', stats: '275/300', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c598d0c5ad6ed0eea27e054f0d41c745b593c0595bc15249986d973167f9326a?apiKey=748f91a40ab04acf923d77b5c15f23f6&' },
    { mealName: 'Lunch', stats: '475/400', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5dc24ed323109ebff961a17d73348225600db9480353f3fc77d48f5668361c05?apiKey=748f91a40ab04acf923d77b5c15f23f6&' },
    { mealName: 'Dinner', stats: '475/400', src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5dc24ed323109ebff961a17d73348225600db9480353f3fc77d48f5668361c05?apiKey=748f91a40ab04acf923d77b5c15f23f6&' },
  ];

  const selectedDate = new Date();
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Array to store the seven dates
    const dates = [];
  
    // Loop to populate the array with seven dates
    for (let i = -3; i <= 3; i++) {
      const date = new Date();
      date.setDate(selectedDate.getDate() + i);
      dates.push(date);
    }

    function addLeadingZero(number) {
      return number < 10 ? '0' + number : number.toString();
    }

  return (
    <View style={styles.appContainer}>
      <View style={styles.dailyStatsContainer}>
        {/* <FlatList
          data={dailyStatistics}
          renderItem={({ item }) => (
            <DailyStatisticCard day={item.day} date={item.date} isActive={item.isActive} />
          )}
          keyExtractor={item => item.date}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dailyStatsList}
        /> */}
          <View style={styles.dayItemsContainer}>
        {dates.map((date, index) => (
          <DayItem day={daysOfWeek[date.getDay()]} date={addLeadingZero(date.getDate())} isSelected={date.getDate() == selectedDate.getDate() ? true : false} onSelect={() => {}} />
        ))}
        </View>
      </View>
      <View style={styles.mealRecordsContainer}>
        <View style={{alignItems: 'center'}}>
        <CircularProgress
          value={60}
          radius={84}
          duration={2000}
          progressValueColor={'#ecf0f1'}
          maxValue={200}
          title={'Active Calories'}
          titleColor={'white'}
          titleStyle={{fontSize: 13}}
        />
        
        </View>

        <View style={styles.activityRingContainer}>
          <View style={{padding:35}}>
            <CircularProgress
                      value={60}
                      radius={50}
                      duration={2000}
                      progressValueColor={'#ecf0f1'}
                      maxValue={200}
                      title={'Active Time'}
                      titleColor={'white'}
                      titleStyle={{fontSize: 12}}
                    />
          </View>
          <View style={{padding:35}}>
                <CircularProgress
                  value={60}
                  radius={50}
                  duration={2000}
                  progressValueColor={'#ecf0f1'}
                  maxValue={200}
                  title={'Target '}
                  titleColor={'white'}
                  titleStyle={{fontSize: 12}}
                />
          </View>
        </View>
        

        {/* <View style={styles.activityRingContainer}>
          <Image
            source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e34673465d2879a78df60a1304a8343f3d21e1ae3ab7c9bc310d85cf7a8d1fa?apiKey=748f91a40ab04acf923d77b5c15f23f6&" }}
            style={styles.activityRing}
          />
          <View style={styles.activityRingTextContainer}>
            <Text style={styles.calorieCount}>652</Text>
            <Text style={styles.calorieLabel}>Cal</Text>
          </View>
        </View> */}
        <Text style={styles.mealRecordsTitle}>Meal Records</Text>
        {mealRecords.map((meal) => (
          <MealRecordCard key={meal.mealName} mealName={meal.mealName} stats={meal.stats} src={meal.src} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1F2937',
    width: "100%",
  },
  coverImage: {
    width: '100%',
    aspectRatio: 8.33,
  },
  dayItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dailyStatsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: '100%',
    backgroundColor: '#374151',
  },
  dailyStatsList: {
    justifyContent: 'space-between',
  },
  dailyStatCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 9999,
  },
  dailyStatCardActive: {
    backgroundColor: '#A3E635',
  },
  dailyStatText: {
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFF',
  },
  dailyStatDate: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mealRecordsContainer: {
    paddingHorizontal: 24,
    marginTop: 32,
    width: '100%',
  },
  activityRingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activityRingTextContainer: {
    position: 'absolute',
  },
  calorieCount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  calorieLabel: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  mealRecordsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  mealRecordCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#374151',
  },
  mealRecordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  mealRecordStats: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
    color: '#A3E635',
  },
  mealRecordImage: {
    width: 24,
    height: 24,
  },

  dayItemSelected: {
    container: {
      backgroundColor: '#00FF00',
      padding: 10,
      borderRadius: 15,
    },
    day: {
      color: '#000000',
    },
    date: {
      color: '#000000',
    },
  },
  dayItem: {
    container: {
      backgroundColor: '#777777',
      padding: 10,
      borderRadius: 15,
    },
    day: {
      color: '#FFFFFF',
    },
    date: {
      color: '#FFFFFF',
    },
  },

});

export default FitnessTrackerApp;