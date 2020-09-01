const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')

exports.index =  function (req, res) {
  const instructors = data.instructors.map(instructor => {
    return {
    ...instructor,
    services: instructor.services.split(',')
  }})
  return res.render('instructors/index', { instructors })
}

exports.create = function (req, res) {
  return res.render('instructors/create')
}

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

exports.show = function (req, res) {
  const { id } = req.params
  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  })
  if(!foundInstructor) return res.send('Instructor not found!')
  const instructor = {
    ...foundInstructor,
    age: age (foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
  }
  return res.render('instructors/show', { instructor })
}

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

exports.put = function (req, res) {
  const { id } = req.body
  let index = 0
  const foundInstructor = data.instructors.find(function(instructor, foundIndex){
    if (instructor.id == id) {
      index = foundIndex
      return true
    }
  })
  if (!foundInstructor) return res.send('Instructor not found!')
  const instructor = {
    ...foundInstructor,
    ...req.body,
    id: Number(req.body.id),
    birth: Date.parse(req.body.birth),
  }
  data.instructors[index] = instructor
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if(err) return res.send('Write Error!')
    return res.redirect(`instructors/${id}`)
  })
}

exports.delete = function (req, res){
  const { id } = req.body
  const filterInstructor = data.instructors.filter(function(instructor){
    return instructor.id != id
  })
  data.instructors = filterInstructor
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send('Write error')
    return res.redirect('instructors')
  })
}