// logger template
// const log = new (require('../logger'))('server/thing')

class Logger {
	constructor(name, debugOverride = false) {
		this.name = name
		this.debugOn = process.env.DES_DEBUG || debugOverride
		this.notSilent = process.env.DES_LOGGING || false
	}

	fatal(text, ...data) {
		this.error(text, data)
		throw new Error(text)
	}

	error(text, ...data) {
		if (!this.notSilent) return
		console.error(`ERR    ${this.name}:\n    ${text}`, data)
	}

	warn(text, ...data) {
		if (!this.notSilent) return
		console.warn(`WARN   ${this.name}:\n    ${text}`, data)
	}

	notice(text, ...data) {
		if (!this.notSilent) return
		console.log(`NOTICE ${this.name}:\n    ${text}`, data)
	}

	info(text, ...data) {
		if (!this.notSilent) return
		console.info(`INFO   ${this.name}:\n    ${text}`, data)
	}

	request(text, ...data) {
		if (!this.notSilent) return
		console.info(`HTTP   ${this.name}:\n    ${text}`)
	}

	debug(text, ...data) {
		if (!this.notSilent) return
		if (this.debugOn) {
			console.log(`DEBUG  ${this.name}:\n    ${text}`, data)
		}
	}

}

module.exports = Logger