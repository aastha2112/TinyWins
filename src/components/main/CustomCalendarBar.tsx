import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonStyles } from '../styles/CommonStyles';

const CustomCalendarBar = () => {
  const date = new Date();
  
  const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayToday = dayArr[date.getDay()]; 
  const dateToday = date.getDate();
  
  const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const presentMonth = fullMonths[date.getMonth()];

  const year = date.getFullYear();

  const [selectedDate, setSelectedDate] = useState(dateToday);

  const getWeekDays = (referenceDate: Date) => {
    const dayOfWeek = referenceDate.getDay();
    const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    
    const startOfWeek = new Date(referenceDate);
    startOfWeek.setDate(referenceDate.getDate() + distanceToMonday);
    
    const days = [];
    const weekHeaderNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(startOfWeek);
      nextDay.setDate(startOfWeek.getDate() + i);
      
      days.push({
        dayName: weekHeaderNames[i],
        dayNumber: nextDay.getDate(),
      });
    }
    return days;
  };

  const weekDays = getWeekDays(date);

  return (
    <View style={styles.outerContainer}>
      <Text style={CommonStyles.subHeadingText}>
        {`${dayToday}, ${dateToday} ${presentMonth} ${year}`}
      </Text>

      <View style={styles.calendarRow}>
        {weekDays.map((item, index) => {

          const isSelected = item.dayNumber === selectedDate;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDate(item.dayNumber)}
              style={styles.dayColumn}
              activeOpacity={0.8}
            >
              <Text style={[styles.dayLabel, isSelected && styles.activeDayLabel]}>
                {item.dayName}
              </Text>

              <View style={[styles.dateCircle, isSelected && styles.activeDateCircle]}>
                <Text style={[styles.dateNumber, isSelected && styles.activeDateNumber]}>
                  {item.dayNumber}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 10,
    width: '100%',
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 16,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
    fontWeight: '500',
  },
  activeDayLabel: {
    color: '#000000',
    fontWeight: '700',
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeDateCircle: {
    backgroundColor: '#232528',
    elevation: 3,
  },
  dateNumber: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '600',
  },
  activeDateNumber: {
    color: '#FFFFFF',
  },
});

export default CustomCalendarBar;
