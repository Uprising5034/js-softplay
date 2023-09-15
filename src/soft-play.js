/*
TODO: Changing rules for multiple play centres
       - What kind of rules can we have?
            - Entering
              - Adult to children ratio
              - Minimum adult count
              - Maximum child count
            - Leaving
              - Adult to children ration
              - Minimum adult count
            - Occupancy
              - Adult to children ratio inside the building
              - Maximum totalPop occupancy
              - Minimum & Maximum adult occupancy
              - Maximum child occupancy
*/

const playCentre = {
  1: {
    occupancy: { adults: 0, children: 0 },
    totalPop: { adults: 0, children: 0 },
    rules: {
      enter: {
        minAdults: 1,
        maxAdults: 4,
        minChildren: 0,
        maxChildren: 4,
        maxTotal: 8,
        childToAdultRatio: 2
      },
      leave: {
        minAdults: 1,
        maxAdults: 4,
        minChildren: 0,
        maxChildren: 4,
        maxTotal: null,
        childToAdultRatio: 2
      },
      occupancy: {
        minAdults: 1,
        maxAdults: 4,
        minChildren: 0,
        maxChildren: 4,
        maxTotal: 80,
        childToAdultRatio: 2
      }
    }
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

function bouncer(centreNo, rulesCategory, numAdults, numChildren) {
  const rules = retrieve(centreNo, 'rules')

  const rulesCategoryLower = rulesCategory.toLowerCase()
  const validRules = Object.keys(rules)
  if (!validRules.includes(rulesCategoryLower)) {
    throw RangeError(
      `${rulesCategory} is not a valid rules category, please pick from the following: ${validRules}`
    )
  }

  const currentRule = rules[rulesCategoryLower]
  const occupancyRule = rules.occupancy

  console.log('currentRule', currentRule)
  // Enter rules
  if (
    (currentRule.minAdults <= numAdults || currentRule.minAdults === null) &&
    (currentRule.maxAdults >= numAdults || currentRule.maxAdults === null) &&
    (currentRule.minChildren <= numChildren ||
      currentRule.minChildren === null) &&
    (currentRule.maxChildren >= numChildren ||
      currentRule.maxChildren === null) &&
    (currentRule.maxTotal >= numAdults + numChildren ||
      currentRule.maxTotal === null) &&
    (currentRule.childToAdultRatio * numAdults >= numChildren ||
      currentRule.childToAdultRatio === null)
  ) {
    console.log('all statements true')
  }
}
bouncer(1, 'enter', 2, 4)

// module.exports = {
//   enter: enter,
//   leave: leave,
//   occupancy: occupancy,
//   totalPop: totalPop
// }
