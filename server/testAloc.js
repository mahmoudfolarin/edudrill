require("dotenv").config()

async function testAloc() {
  try {
    const url =
      "https://dev.aloc.com.ng/api/v1/questions?examType=waec&subject=mathematics&limit=5"

    console.log("Requesting:")
    console.log(url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": process.env.ALOC_API_KEY,
      },
    })

    const data = await response.json()

    console.log("\nSTATUS:", response.status)
    console.log("\nRESPONSE:")
    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("ALOC TEST ERROR:", error)
  }
}

testAloc()