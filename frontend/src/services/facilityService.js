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

export default { register, activateAM }