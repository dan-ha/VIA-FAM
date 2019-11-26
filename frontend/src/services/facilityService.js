import axios from 'axios'

const FACILITY_SERVICE_URL = process.env.VUE_APP_BACKEND_URL

const axiosIns = axios.create({
  baseURL: FACILITY_SERVICE_URL,
  timeout: 1000
})

async function register(facility) {
  const response = await axiosIns.post(`/facility`, facility)
  return response.data
}

async function activateAM(facilityName, ser, facilitatorUsernames) {
  const facilitators = facilitatorUsernames.map(u => ({facilityName, employeeId: u}))
    const services = ser.map(s => ({facilityName, service: s}))
  let updated = await axiosIns.patch(`/facility/${facilityName}`, {
    services,
    facilitators,
    appointmentManager: true
  })
  return updated
}

async function editFacility(facility) {
  let updated = await axiosIns.patch(`/facility/${facility.name}`, {
    ...facility
  })
  return updated
}

async function bookAppointment(appointment) {
  const response = await axiosIns.post(`/appointment`, appointment)
  return response.data
}

async function getAppointments(facilitator, student) {
  const response = await axiosIns.get('/appointment', {
    params: {
      facilitator,
      student
    }
  })
  return response.data
}

async function deleteFacility(name){
  const response = await axiosIns.delete(`/facility/${name}`)
  return response.status==200 ? true : false
}

async function deleteAppointment(appointmentId){
  const response = await axiosIns.delete(`/appointment/${appointmentId}`)
  return response.status==200 ? true : false
}

export default { register, editFacility, activateAM, deleteFacility, deleteAppointment, bookAppointment, getAppointments }