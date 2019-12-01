import OpeningHours from "./OpeningHours"

class Facility {

  constructor(state) {
    if (state) {
      this.name = state.name
      this.description = state.description
      this.openingHours = state.openingHours.map(oh => new OpeningHours(oh.dayOfWeek, oh.timeOpen, oh.duration))
      this.emailAddress = state.emailAddress
      this.phoneNo = state.phoneNo
      this.location = state.location
      this.additionalInfo = state.additionalInfo
      this.appointmentManager = state.appointmentManager
      this.facilitators = state.facilitators
      this.services = state.services
    }
  }

}

export default Facility