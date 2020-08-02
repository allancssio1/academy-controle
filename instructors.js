const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')
const Intl = require('intl')

// function for show instructors
exports.show = function (req, res) {
  const { id } = req.params
  
  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id

  })
  if(!foundInstructor) return res.send('Instructor not found!')

  const instructor = {
    ...foundInstructor,
    age: age (foundInstructor.birth),
    // gender:"",
    services: foundInstructor.services.split(","),
    created_at: Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
  }

  return res.render('instructors/show', { instructor })
}

//function for edit instructor
exports.edit = function (req, res) {
  const { id } = req.params
  
  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })
  if (!foundInstructor) return res.send ('Instructor not found!')
  
  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }

  return res.render('instructors/edit', { instructor })
}

//function for create
exports.post = function (req, res) {
  const keys = Object.keys(req.body)
  
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('please, fill all fields')
    }  
  }
  
  let { avatar_url, name, birth, gender, services } = req.body

  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)
  
  data.instructors.push(
    {
      id,
      avatar_url,
      name,
      birth,
      created_at,
      gender,
      services
    }
  )
  
  fs.writeFile("data.json", JSON.stringify (data, null, 2), function(err){ 
    if (err) return res.send('write file error')

    return res.redirect('instructors/create')
  })
}