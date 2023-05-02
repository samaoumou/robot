/*create an object containing humidite, temperature an object with two keys sol et ambiant, luminosite */
export type Climat = {
    _id: {
        year: number,
        month: number,
        day: number
    },
    temperature: number,
    humidityA: number,
    humidityS: number,
    luminosity: number,
    date: Date
}
