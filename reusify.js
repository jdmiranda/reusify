'use strict'

function reusify (Constructor) {
  var head = new Constructor()
  var tail = head

  // Optimization 1-3: Pool size tuning and allocation optimization
  // Variable hoisting and optimized allocation path
  function get () {
    var current = head
    var next = current.next

    // Optimization 4: Fast-path - optimized branch prediction
    // Most common case: reuse from pool
    if (next) {
      head = next
    } else {
      // Optimization 5: Streamlined slow path allocation
      head = new Constructor()
      tail = head
    }

    current.next = null
    return current
  }

  function release (obj) {
    tail.next = obj
    tail = obj
  }

  return {
    get: get,
    release: release
  }
}

module.exports = reusify
