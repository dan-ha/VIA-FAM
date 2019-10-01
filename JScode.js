


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
