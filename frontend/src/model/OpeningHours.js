import WeekdaysEnum from './WeekdaysEnum.js'
import moment from 'moment'

class OpeningHours {

  constructor(dayOfWeek, timeOpen, duration) {
    this.dayOfWeek = dayOfWeek
    this.timeOpen = timeOpen
    this.duration = duration
  }

  getWeekday() {
    return WeekdaysEnum.dayOfWeek
  }

  getTimeClose() {
    const time = moment(this.timeOpen, 'HH:mm')
    time.add(this.duration, 'minutes')
    return time.format('HH:mm')
  }

  setTimeClose(timeClose) {
    const start = moment(this.timeOpen, 'HH:mm')
    const end = moment(timeClose, 'HH:mm')
    this.duration = moment.duration(end.diff(start)).asMinutes()
  }
}

export default OpeningHours