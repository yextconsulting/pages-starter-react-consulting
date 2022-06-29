export type Hours = {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
};

export type DayHours = {
  isClosed: boolean,
  openIntervals: Array<openInterval>,
}

type openInterval = {
  start: string,
  end: string,
}

// example output: ["Mo-Fr 10:00-19:00", "Sa 10:00-22:00", "Su 10:00-21:00"]
// weekdays are indicated as Mo, Tu, We, Th, Fr, Sa, Su
export const OpeningHours = (hours?: Hours) => {
  if (hours == null) {
    return {};
  }

  let hoursMap = new Map<string, Array<string>>();

  hoursMap = getHoursByDay(hours.monday, hoursMap, "Mo")
  hoursMap = getHoursByDay(hours.tuesday, hoursMap, "Tu")
  hoursMap = getHoursByDay(hours.wednesday, hoursMap, "We")
  hoursMap = getHoursByDay(hours.thursday, hoursMap, "Th")
  hoursMap = getHoursByDay(hours.friday, hoursMap, "Fr")
  hoursMap = getHoursByDay(hours.saturday, hoursMap, "Sa")
  hoursMap = getHoursByDay(hours.sunday, hoursMap, "Su")

  let hoursArray = new Array<string>();

  for (const [interval, days] of hoursMap){
    let daysOfWeek = days.join(",")
    hoursArray.push(daysOfWeek + " " + interval)
  }

  return {
    openingHours: hoursArray,
  }
}

const getHoursByDay = (hours: DayHours, hoursMap: Map<string, Array<string>>, day: string) => {
  if (hours.isClosed == true) {
    let interval = "00:00-00:00"
    let days = hoursMap.get(interval) ?? Array<string>();
    days.push(day)
    hoursMap.set(interval, days);

    return hoursMap
  }

  for (let i = 0; i < hours.openIntervals.length; i++) {
    let interval = hours.openIntervals[i].start + "-" + hours.openIntervals[i].end;
    let days = hoursMap.get(interval) ?? Array<string>();
    days.push(day)
    hoursMap.set(interval, days);
  }

  return hoursMap
}
