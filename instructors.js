const fs = require('fs')
const data = require('./data.json')

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