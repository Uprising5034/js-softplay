// TODO: Changing rules for multiple play centres
//        - What kind of rules can we have?
            - Entering
              - Adult to children ratio
              - Minimu
            - Leaving
              - Adult to children ration
            - Adult to children ratio inside the building
            - Maximum totalPop occupancy
            - Minimum & Maximum adult occupancy
            - Maximum child occupancy
*/

const playCentre = {
  1: {
    occupancy: { adults: 0, children: 0 },
    totalPop: { adults: 0, children: 0 },
    rules: {}
  },
  2: {
    occupancy: { adults: 0, children: 0 },
    totalPop: { adults: 0, children: 0 },
    rules: {}
  },
  3: {
    occupancy: { adults: 0, children: 0 },
    totalPop: { adults: 0, children: 0 },
    rules: {}
  }
}

function enter(centreNo, numAdults, numChildren) {
  let validInput = false
  const currentPop = retrieve(centreNo, 'occupancy')
  const totalPop = retrieve(centreNo, 'totalPop')
  if (numAdults >= numChildren) {
    currentPop.adults += numAdults
    currentPop.children += numChildren
    totalPop.adults += numAdults
    totalPop.children += numChildren
    validInput = true
  }
  return validInput
}

function leave(centreNo, numAdults, numChildren) {
  let validInput = false
  const currentPop = retrieve(centreNo, 'occupancy')

  // rules
  const checkAdults = currentPop.adults - numAdults
  const checkChildren = currentPop.children - numChildren
  if (
    numAdults <= currentPop.adults && // Case 4
    numChildren <= currentPop.children && // Case 4
    numAdults >= numChildren && // Case 1, Case 3
    checkAdults >= checkChildren // Case 2
  ) {
    currentPop.adults -= numAdults
    currentPop.children -= numChildren
    validInput = true
  }
  return validInput
}

function retrieve(centreNo, centreProperty) {
  return playCentre[centreNo][centreProperty]
}

enter(1, 2, 2)
enter(3, 4, 4)
leave(3, 1, 1)
console.log('playCentre :', playCentre)

// module.exports = {
//   enter: enter,
//   leave: leave,
//   occupancy: occupancy,
//   totalPop: totalPop
// }
