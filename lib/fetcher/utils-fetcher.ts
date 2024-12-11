const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "your_api_key"
// Using OpenMeteo API instead (no API key needed)
const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=-7.7971&longitude=110.3688&current_weather=true&timezone=Asia%2FJakarta`
// Update the API URL
const QUOTES_API_URL =
  "https://api.forismatic.com/api/1.0/?method=getQuote&forQuote&lang=en&format=json"

export async function getWeatherData() {
  try {
    const res = await fetch(WEATHER_API_URL, {
      next: { revalidate: 1800 },
    })
    if (!res.ok) throw new Error("Weather fetch failed")
    const data = await res.json()

    // Transform OpenMeteo response to match our needs
    return {
      weather: [
        {
          id: data.current_weather.weathercode,
          description: getWeatherDescription(data.current_weather.weathercode),
        },
      ],
      main: {
        temp: data.current_weather.temperature,
      },
    }
  } catch (error) {
    console.error("Weather fetch error:", error)
    return {
      weather: [{ id: 800, description: "Tidak ada data" }],
      main: { temp: 0 },
    }
  }
}

export async function getMotivationalQuote() {
  try {
    const res = await fetch(QUOTES_API_URL, {
      next: { revalidate: 86400 },
    })
    if (!res.ok) throw new Error("Quote fetch failed")
    const quote = await res.json()
    return {
      content: quote.quoteText.trim(),
      author: quote.quoteAuthor.trim() || "Anonymous",
    }
  } catch (error) {
    console.error("Quote fetch error:", error)
    return {
      content: "Belajar adalah proses yang tidak pernah berakhir",
      author: "Unknown",
    }
  }
}

export function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: "Cerah",
    1: "Sebagian Berawan",
    2: "Berawan",
    3: "Mendung",
    45: "Berkabut",
    48: "Berkabut Tebal",
    51: "Gerimis Ringan",
    53: "Gerimis",
    55: "Gerimis Lebat",
    56: "Gerimis Beku Ringan",
    57: "Gerimis Beku",
    61: "Hujan Ringan",
    63: "Hujan",
    65: "Hujan Lebat",
    66: "Hujan Beku Ringan",
    67: "Hujan Beku",
    71: "Salju Ringan",
    73: "Salju",
    75: "Salju Lebat",
    77: "Butiran Salju",
    80: "Hujan Lokal Ringan",
    81: "Hujan Lokal",
    82: "Hujan Lokal Lebat",
    85: "Hujan Salju Lokal Ringan",
    86: "Hujan Salju Lokal",
    95: "Badai Petir Ringan atau Sedang",
    96: "Badai Petir dengan Hujan Es Ringan",
    99: "Badai Petir dengan Hujan Es",
  }
  return weatherCodes[code] || "Tidak ada data"
}
