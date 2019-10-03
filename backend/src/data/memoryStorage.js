'use strict'

const memoryStorage = function () {
    const facilityList = []

    const save = (facility) => {
        if (!find(facility.name)) {
            facilityList.push(facility)
            return facility
        }
    }
    const find = (name) => facilityList.find(f => f.name === name)
    const getAll = () => facilityList

    return {
        save,
        find,
        getAll
    }
}

module.exports = memoryStorage