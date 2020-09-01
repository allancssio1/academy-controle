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
    const years = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)
    return {
      day,
      month,
      years,
      iso: `${years}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },
  service: function (element) {
    for(let index=0; index < element.length; index++){
      return element[index].services.split(',')
    }
  },
  typeBlood: function (element) {
    switch (element) {
      case 'A1': return 'A+'
      case 'A0': return 'A-'    
      case 'B1': return 'B+'    
      case 'B0': return 'B-'    
      case 'AB1': return 'AB+'    
      case 'AB0': return 'AB-'    
      case 'O1': return 'O+'    
      case 'O0': return 'O-'    
      default:
        break;
    }
  }
}