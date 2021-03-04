function calculateRate(req, res) {
  var weight = req.query.weight
  const type = req.query.type
  //dictionaries of cost to ship different types and weights of mail
  const stamped = {1:'0.55', 2:'0.75', 3:'0.95', 3.5:'1.15'}
  const metered = {1:'0.51', 2:'0.71', 3:'0.91', 3.5:'1.11'}
  const flats = {1:'1', 2:'1.20', 3:'1.40', 4:'1.60', 5:'1.80', 6:'2.00', 7:'2.20', 8:'2.40',
    9:'2.60', 10:'2.80', 11:'3.00', 12:'3.20', 13:'3.40'}
  const package = {1:4, 2:4, 3:4, 4:4, 5:'4.80', 6:'4.80', 5:'4.80', 6:'4.80',
    7:'4.80', 8:'4.80', 9:'5.50', 10:'5.50', 11:'5.50', 12:'5.50', 13:'6.25'}//assumed zone 1 or 2 on the website

  if (type == 'stamped'){
    if (weight > 3 && weight <= 3.5) {weight = 3.5}//if its between 3 and 3.5, round up to 3.5
    else { weight = Math.ceil(weight)}//else round up to the next whole number
    
    if (weight > 3.5) { var cost = 'Too heavy for stamped, must be less than 3.5 oz'}
    else { var cost = stamped[weight] }
  }
  
  if (type == 'metered'){
    if (weight > 3 && weight <= 3.5) {weight = 3.5}//if its between 3 and 3.5, round up to 3.5
    else { weight = Math.ceil(weight)}//else round up to the next whole number
    
    if (weight > 3.5){ var cost = 'Too heavy for metered, must be less than 3.5 oz'}
    else { var cost = metered[weight] }
  }

  //these have no if's because the html prevents inputs below 1 or above 13, so any decimals
  //are just rounded up to prevent no value being present in the dictionary called 'flats'
  if (type == 'flats') {
    weight = Math.ceil(weight)
    var cost = flats[Math.ceil(weight)]//ceil prevents having to map an infinite number of decimals
  }

  if (type == 'package') {
    weight = Math.ceil(weight)
    var cost = package[Math.ceil(weight)]//ceil prevents having to map an infinite number of decimals
  }

  res.render('./pages/prove09result', {weight: weight, type: type, cost: cost})
}

module.exports = calculateRate