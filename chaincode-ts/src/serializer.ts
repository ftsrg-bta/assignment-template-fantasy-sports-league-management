export class FantasyLeagueSerializer {
    static serialize<I, O extends Buffer<ArrayBuffer>>(object: I): O {
        let result: string
        if (typeof object !== 'object') {
            result = object.toString()
        } else {
            result = JSON.stringify(object)
        }
        return Buffer.from(result, 'utf8') as O
    }

    static deserialize<I extends Uint8Array, O>(buffer: I): O {
        let string = buffer.toString()
        let result: any
        // If buffer is Buffer or Uint8Array, convert it to a string:
        const rawString =
            typeof buffer === 'string' ? buffer : buffer.toString()

        // 1) Try JSON
        try {
            return JSON.parse(rawString) as O
        } catch {
            // If JSON.parse fails, we keep going
        }

        // 2) Try Number
        const asNumber = Number(rawString)
        if (!Number.isNaN(asNumber)) {
            // If rawString is only digits (or valid numeric string), parse as number
            return asNumber as unknown as O
        }

        // 3) Try boolean
        if (rawString.toLowerCase() === 'true') {
            return true as unknown as O
        }
        if (rawString.toLowerCase() === 'false') {
            return false as unknown as O
        }

        // 4) Fallback to string
        return rawString as unknown as O
    }

}