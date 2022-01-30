import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {FONT, COLORS, WIDTH, HEIGHT} from '../../Utils/constants';
import moment from 'moment'

let months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"]

export default function CalendarScreen({events, onDaySelect, monthChange}) {

  const [markDates, setMarkDates] = useState({})
  const [currentMonth, setMonth] = useState(new Date())

  useEffect(() => {
    let eventsDates = []
    events.map((ev, i)=>{
      const date = moment(ev.start_date).format("YYYY-MM-DD")
      eventsDates.push(date)
    })
    setTimeout(() => {
      let newDaysObject = {};
      eventsDates.forEach((day) => {
        newDaysObject[day] = {
            marked: true,
            selected: true,
            selectedColor: COLORS.SECONDARY,
            selectedTextColor: COLORS.WHITE,
      };
      });
      setMarkDates(newDaysObject)
    }, 500);    
  },[events])
  
  // const renderDay = (date, state) => {
  //   const today = moment().format('LL ')
  //   const day = moment(date.timestamp).format('LL ')
  //     return (
  //     today == day ? (
  //       <View style={styles.todayView}>
  //         <Text style={[styles.dayStyle, styles.today, {color: state === 'disabled' ? 'gray' : '#fff'}]}>
  //           {date.day}
  //         </Text>
  //       </View>
  //      ) : (
  //       <View>
  //       <Text style={[styles.dayStyle, {color: state === 'disabled' ? 'gray' : '#000'}]}>
  //         {date.day}
  //       </Text>
  //     </View>
  //    ))
  // }

  const onDatePress = (day) => {    
    onDaySelect(day)
  }

  const onMonthChange = (type) => {
    if(type === 'NEXT') {
      const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
      setMonth(newMonth)
      monthChange(newMonth)
    } else {
      const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
      setMonth(newMonth)
      monthChange(newMonth)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <CalendarList
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
          calendarWidth={WIDTH* 0.92}
          style={{
            height: WIDTH* 0.92 * 0.87,
            marginVertical: 10
          }}
          // dayComponent={({date, state}) => {
          //   return (
          //     <View>
          //       {renderDay(date, state)}
          //     </View>
          //   );
          // }}
          // Initially visible month. Default = Date()
         // current={new Date()}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          // minDate={'2012-05-10'}
          // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={'2012-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={onDatePress}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          onVisibleMonthsChange={(month) => console.log('m', month)
          }
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // renderArrow={(direction) => <Text>></Text>}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          // disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          // firstDay={1}
          // Hide day names. Default = false
          // hideDayNames={true}
          // Show week numbers to the left. Default = false
        //  showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => {
            subtractMonth()
            onMonthChange('PREV')
            console.log('PREV');
            
           }}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => {
            addMonth()
            onMonthChange('NEXT')
          }}
          // Disable left arrow. Default = false
          disableArrowLeft={true}
          // Disable right arrow. Default = false
          disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter.
          renderHeader={(date) => {
           const monthNumber  = new Date(date).getMonth()
           const year  = new Date(date).getFullYear()
            return(
            <Text style={styles.monthHeader}>{months[monthNumber]},  {year}</Text>
            )
            
          }}
          markedDates={markDates}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={false}
          
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#000000',
           // textSectionTitleDisabledColor: COLORS.SECONDARY,
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#000000',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: COLORS.PRIMARY,
            disabledArrowColor: '#d9e1e8',
            monthTextColor: COLORS.PRIMARY,
            indicatorColor: COLORS.GRAY,
            textDayFontFamily: FONT.FAMILY.SEMI_BOLD,
            textMonthFontFamily: FONT.FAMILY.SEMI_BOLD,
            textDayHeaderFontFamily: FONT.FAMILY.BOLD,
            textDayFontWeight: '400',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '400',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center'
  },
  calendarContainer: {
      width: WIDTH * 0.92,
      backgroundColor: COLORS.WHITE,
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      marginTop: HEIGHT * 0.04
  },
  monthHeader: {
      fontSize: FONT.SIZE.MEDIUM,
      fontFamily: FONT.FAMILY.BOLD,
      color: '#000000'
  },
  dayStyle: {
      textAlign: 'center',
      color: '#000',
      margin: 2
  },
  today: {
    color: COLORS.WHITE
  },
  todayView: {
    backgroundColor: '#00adf5',
    borderRadius: 100,
    padding: 5,
  }
});
