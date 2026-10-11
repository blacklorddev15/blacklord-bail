import makeWASocket from './Socket/index'

// ─── ASTROCORE banner ────────────────────────────────────────────────────────
// Printed once when the library is imported (i.e. when the bot boots).
// Colours are raw ANSI truecolor, so no extra dependency is pulled in; the box
// matches the style used by astrocore's own logger (logger.js -> banner()).
// Disable with ASTROCORE_BANNER=0.
const BRAND = 'ASTROCORE'
const ESC = '\x1b['
const RESET = ESC + '0m'
const CYAN = ESC + '36m'
const DIM = ESC + '90m'
const BOX_TOP = `┏━━━━━━━━━━━━━『  ${BRAND.padEnd(14)}  』━━━━━━━━━━━━━─`
const BOX_BOTTOM = '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━─ ⳹'
const BANNER_LINES = [
	`»  ${BRAND} BAILEYS — WhatsApp Web engine`,
	'»  Fast pairing · buttons · full media support',
	'»  〘 Blacklord 〙 — developer'
]

function hsvToRgb(h: number, s: number, v: number): number[] {
	const c = v * s
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
	const m = v - c
	const seg = Math.floor(h / 60) % 6
	const rgb = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]][seg]
	return rgb.map((n) => Math.round((n + m) * 255))
}

// lolcat-style gradient — hue advances per visible character
function rainbow(text: string): string {
	let out = ''
	let n = 0
	for (const line of text.split('\n')) {
		for (const ch of line) {
			if (ch === ' ') {
				out += ch
				continue
			}
			const [r, g, b] = hsvToRgb((n++ * 6) % 360, 0.85, 1)
			out += `${ESC}38;2;${r};${g};${b}m${ch}`
		}
		out += '\n'
	}
	return out + RESET
}

if (process.env.ASTROCORE_BANNER !== '0') {
	// eslint-disable-next-line no-console
	console.log(`${CYAN}[ ${BRAND} ]${RESET} ${DIM}baileys engine loaded${RESET}`)
	// eslint-disable-next-line no-console
	console.log(rainbow([BOX_TOP, ...BANNER_LINES, BOX_BOTTOM].join('\n')))
}

export * from '../WAProto/index.js'
export * from './Utils/index'
export * from './Types/index'
export * from './Defaults/index'
export * from './WABinary/index'
export * from './WAM/index'
export * from './WAUSync/index'

export type WASocket = ReturnType<typeof makeWASocket>
export { makeWASocket }
export default makeWASocket
