module.exports = {
  age: function (timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)
  
    let age = today.getFullYear() - birthDate.getFullYear() 
    const month = today.getMonth() - birthDate.getMonth()
  
    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      age = age - 1
    }
  
    return age
  },
  date: function (timestamp) {
    const date = new Date(timestamp)
    const yers = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)
    return `${yers}-${month}-${day}`
  },
  forService: function (element) {
    for(let index=0; index < element.length; index++){
      return element[index].services.split(',')
    }
  }
}