function calculateRate(req, res) {
  const weight = req.query.weight
  const type = req.query.type
  var cost = 0
  if (type == 'stamped'){
    if (weight > 3.5) { cost = -999}
    else {
      const stamped = {1:0.55, 2:0.75, 3:0.95, 3.5:1.15}
      cost = stamped[weight]
    }
  }
  
  if (type == 'metered'){
    if (weight > 13){ cost = -999 }
    else {
      const metered = {1:0.51, 2:0.71, 3:0.91, 3.5:1.11}
      cost = metered[weight]
    }
  }

  if (type == 'flats') {
    if (weight > 13){ cost = -999 }
    else {
      const flats = {1:1, 2:1.20, 3:1.40, 4:1.60, 5:1.80, 6:2.00, 7:2.20, 8:2.40,
                       9:2.60, 10:2.80, 11:3.00, 12:3.20, 13:3.40}
      cost = flats[weight]
    }
  }

  if (type == 'package') {
    if (weight > 13){ cost = -999 }
    else {
      const package = {1:4, 2:4, 3:4, 4:4, 5:4.80, 6:4.80, 5:4.80, 6:4.80,
                       7:4.80, 8:4.80, 9:5.50, 10:5.50, 11:5.50, 12:5.50, 13:6.25,}//assumed zone 1 or 2 on the website
      cost = package[weight]
    }
  }


  res.render('./pages/prove09result', {weight: weight, type: type, cost: cost})
}

module.exports = calculateRate