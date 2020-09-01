const fs = require('fs')
const data = require('../data.json')
const { age, date, typeBlood } = require('../utils')
const Intl = require('intl')

exports.index =  function (req, res) {
  return res.render('members/index', { members: data.members })
}

exports.create = function (req, res) {
  return res.render('members/create')
}

exports.show = function (req, res) {
  const { id } = req.params
  
  const foundMember = data.members.find(function(member){
    return member.id == id
  })
  if(!foundMember) return res.send('Member not found!')

  const member = {
    ...foundMember,
    age: age (foundMember.birth),
    birth: date(foundMember.birth).birthDay,
    blood: typeBlood(foundMember.blood)
  }
  return res.render('members/show', { member })
}

exports.edit = function (req, res) {
  const { id } = req.params
  
  const foundMember = data.members.find(function(member){
    return member.id == id
  })
  if (!foundMember) return res.send ('Member not found!')
  
  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }

  return res.render('members/edit', { member })
}

exports.post = function (req, res) {
  const keys = Object.keys(req.body)
  
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('please, fill all fields')
    }  
  }
  
  let { avatar_url, name, email, birth, gender, blood, weight, height } = req.body


  birth = Date.parse(birth)

  let id = 1
  const lastMember = data.members[data.members.length -1]
  if (lastMember) {
    id = lastMember.id + 1
  }

  data.members.push(
    {
      id,
      avatar_url,
      name,
      email,
      birth,
      gender,
      blood,
      weight,
      height
    }
  )
  fs.writeFile("data.json", JSON.stringify (data, null, 2), function(err){ 
    if (err) return res.send('write file error')

    return res.redirect(`members/${id}`)
  })
}

exports.put = function (req, res) {
  const { id } = req.body
  let index = 0
  const foundMember = data.members.find(function(member, foundIndex){
    if (member.id == id) {
      index = foundIndex
      return true
    }
  })
  if (!foundMember) return res.send('Member not found!')

  const member = {
    ...foundMember,
    ...req.body,
    id: Number(req.body.id),
    birth: Date.parse(req.body.birth),
  }

  data.members[index] = member

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if(err) return res.send('Write Error!')

    return res.redirect(`/members/${id}`)
  })
}

exports.delete = function (req, res){
  const { id } = req.body
  const filterMember = data.members.filter(function(member){
    return member.id != id
  })
  data.members = filterMember

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send('Write error')

    return res.redirect('/members')
  })
}