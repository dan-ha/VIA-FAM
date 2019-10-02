


//facility for the VAM
class Facility {
    //constructor
    constructor(facilityName, description) {
        this.facilityName = facilityName;
        this.description = description;
    }
    // returns facility name
    getFacilityName() {
        return this.facilityName;
    }
    // returns facility description
    getDescription() {
        return this.description;
    }
    // sets a new facility description
    setDescription(newDescription) {
        this.description = newDescription;
    }
    // tostring returning all the information of the facility as a single string
    toString() {
        return "Facility " + this.facilityName + " has the following descriptiom description: " + this.description;
    }
    // returns a copy of the facility
    copy() {
        return Facility(this.facilityName, this.description)
    }
}


let newFacility = new Facility("Book a librarian", "Here you can book a librarian")
console.log(newFacility.getFacilityName())
console.log(newFacility.getDescription())
console.log(newFacility.toString())
newFacility.setDescription("Here you can book a librarian who can help you in your needs")
console.log(newFacility.getDescription())
console.log(newFacility.toString())



// Student for the VAM
class Student {
    constructor(FirstName, LastName, password, FieldOfStudies) {
        this.FirstName = FirstName
        this.LastName = LastName
        this.password = password
        this.FieldOfStudies = FieldOfStudies
    }
    // returns first name
    getFirstName() {
        return this.FirstName
    }
    // returns last name
    getLastName() {
        return this.LastName
    }
    // returns full name as a string
    getFullName() {
        return this.FirstName + " " + this.LastName
    }
    // returns student's field of studies
    getFieldOfStudies() {
        return this.FieldOfStudies
    }
    // tostring returning all the information of the student as a single string
    toString() {
        return "Student name " + this.FirstName + " " + this.LastName + " is studying " + this.FieldOfStudies;
    }
    // returns a copy of the student
    copy() {
        return Student(this.FirstName, this.LastName, this.password, this.FieldOfStudies)
    }
}

// Facility Administrator for the VAM
class FacilityAdministrator {
    constructor(username, password) {
        this.username = username
        this.password = password

    }
    // returns username
    getUsername() {
        return this.username
    }
    // returns a copy of the Facility Administrator
    copy() {
        return FacilityAdministrator(this.username, this.password)
    }
}

// Facilitator for the VAM
class Facilitator {
    constructor(FirstName, LastName, password) {
        this.FirstName = FirstName
        this.LastName = LastName
        this.password = password
    }
    // returns first name
    getFirstName() {
        return this.FirstName
    }
    // returns last name
    getLastName() {
        return this.LastName
    }
    // returns full name as a string
    getFullName() {
        return this.FirstName + " " + this.LastName
    }
    // tostring returning all the information of the Facilitator as a single string
    toString() {
        return "Facilitator's name " + this.FirstName + " " + this.LastName;
    }
    // returns a copy of the Facilitator 
    copy() {
        return Facilitator(this.FirstName, this.LastName, this.password)
    }
}

// Appointment for the VAM
class Appointment{
    constructor(name, Facility, Student, Facilitator, time, date, location){
        this.name = name
        this.Facility = Facility
        this.Student = Student
        this.Facilitator = Facilitator
        this.time = time
        this.date = date
        this.location = location
    }
    // returns the name of the appointment
    getName(){
        return this.name
    }
    // returns the facility to which the appointment belongs
    getFacility(){
        return this.Facility
    }
    //returns the student who created the appointment
    getStudent(){
        return this.Student
    }
    // returns the Facilitator of the appointment
    getFacilitator(){
        return this.Facilitator
    }
    // sets a new facilitator for the appointment
    setFacilitator(newFacilitator){
        this.Facilitator = newFacilitator
    }
    // returns the time of the appointment
    getTime(){
        return this.time
    }
    // sets a new time for the appointment
    setTime(newTime){
        this.time = newTime
    }
    // returns the date of the appointment
    getDate(){
        return this.date
    }
    // sets a new date for the appointment
    setDate(newDate){
        this.date = newDate
    }
    // returns the location of the appointment
    getLocation(){
        return this.location
    }
    // sets a new location for the appointment
    setLocation(newLocation){
        this.location = newLocation
    }
    //returns a string with all of the information of the appointment
    toString(){
        return "Appointment information: \n name: " +this.name + "belongs to the Facility: " + this.Facility
        + "\nwas made by: " + this.Student + "\nhas " + this.Facilitator + " as facilitator\n" + "and it's going to be on" +
        this.date + " at " + this.time + " on " + this.location
    }
    // returns a copy of the appointment
    copy(){
        return Appointment(this.name, this.Facility, this.Student, this.Facilitator, this.time, this.date, this.location)
    }
}

class Service{
    constructor(name, Facility, Facilitators){
        this.name = name
        this.Facility = Facility
        this.Facilitators = Facilitators
    }
    //returns the name of the service
    getName(){
        return this.name
    }
    // returns the facility that the service belongs to
    getFacility(){
        return this.Facility
    }
    // sets a new facility that the service will belong to
    setFacility(newFacility){
        this.Facility = newFacility
    }
    // returns the facilitator from the facilitators array
    getFacilitator(){
        return this.Facilitators[0]
    }
    // returns the facilitators array
    getFacilitators(){
        return this.Facilitators
    }
    // sets a new array of facilitators
    setFacilitators(newFacilitators){
        this.Facilitators = newFacilitators
    }
    // adds a new facilitator
    addFacilitator(newFacilitator){
        this.Facilitators.add(newFacilitator)
    }
    // returns a toString with all of the information of the service
    toString(){
        return "the service " + this.name + " belongs to the " + this.Facility + " and has as facilitators " + this.Facilitators
    }
    // returns a copy of the Service
    copy(){
        return Service(this.name, this.Facility, this.Facilitators)
    }
}
