const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "your_api_key"
// Using OpenMeteo API instead (no API key needed)
const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=-7.7971&longitude=110.3688&current_weather=true&timezone=Asia%2FJakarta`
// Using type.fit quotes API instead
const QUOTES_API_URL = "https://type.fit/api/quotes"

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
    const quotes = await res.json()
    // Get a random quote from the collection
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    return {
      content: randomQuote.text,
      author: randomQuote.author || "Anonymous",
    }
  } catch (error) {
    console.error("Quote fetch error:", error)
    return {
      content: "Belajar adalah proses yang tidak pernah berakhir",
      author: "Unknown",
    }
  }
}

function getWeatherDescription(code: number): string {
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
    61: "Hujan Ringan",
    63: "Hujan",
    65: "Hujan Lebat",
    80: "Hujan Lokal",
  }
  return weatherCodes[code] || "Tidak ada data"
}
