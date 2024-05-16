/**
 * Logging
 */

const log = (...args) => args.forEach(arg => console.log(arg))


/**
 * Query selection
 */

const qs = selector => document.querySelector(selector)

const qsa = selector => document.querySelectorAll(selector)


/**
 * Element query selection 
 */

Object.assign(HTMLElement.prototype, {
  qs(selector) {
    return this.querySelector(selector)
  },

  qsa(selectors) {
    return this.querySelectorAll(selectors)
  },

  appendAll(...childs) {
    childs.forEach(child => this.appendChild(child))
  }
})


/**
 * Create element 
 */

const create = tag => document.createElement(tag)


/**
 * Creator batch
 */

const creator = args => {
  let el = create(args.tag)

  if (args.id) el.id = args.id
  if (args.cls) el.className = args.cls
  if (args.text) el.innerText = args.text
  if (args.html) el.innerHTML = args.html
  if (args.value) el.value = args.value

  if (args.style)
    Object.assign(el.style, args.style)

  if (args.attrs) Object
    .entries(args.attrs)
    .forEach(([name, value]) => el.setAttribute(name, value))

  if (args.childs)
    el.appendAll(...args.childs)

  if (args.onClick) onClick(el, args.onClick)

  return el
}


/** 
 * Add Event listener on html elements 
 */

const on = (evt, el, behavior) =>
  el.addEventListener(evt, behavior)

const onClick = (el, behavior) =>
  on('click', el, behavior)


/**
 * Join strings
 */

const join = (...strings) => strings.join('')


/**
 * Generate random integers
 */

const rnd = (max = 1000) => parseInt(Math.random() * max)

/**
 * Generate random Hex colors
 */

const rndHexColor = (n = 0xffffff) => "#" + rnd(n).toString(16).padStart(6, 0)


/**
 * Set cookie
 *
 * @param htl hours to live
 */

const setCookie = (name, value, htl) => {
  const millisToLive = Date.now() + htl * 60 * 60 * 1000
  const exDate = new Date(millisToLive).toUTCString()

  document.cookie = `${name}=${value};expires=${exDate};path=/`
}

/**
 * Get cookie
 */

const getCookie = name => {
  let cookies = document.cookie.split(";")

  for (let cookie of cookies) {
    let [cname, cvalue] = cookie.split("=")

    if (name == cname.trim()) return cvalue
  }

  return ""
}


/**
 * Object methods
 */

const getPrototypeFunctions = prototype => Object
  .getOwnPropertyNames(prototype)
  .filter(prop => typeof prototype[prop] === 'function')

const getObjectFunctions = object =>
  getPrototypeFunctions(
    Object.getPrototypeOf(object))