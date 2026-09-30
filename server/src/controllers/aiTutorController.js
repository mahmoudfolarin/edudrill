async function chatWithTutor(req, res) {
  try {
    const {
      message,
      exam,
      subject,
      topic,
      generalTutor,
      messages,
    } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message.",
      })
    }

    const isGeneralTutor =
      generalTutor === true || !subject

    const tutorContext = isGeneralTutor
      ? `
The student is using the General AI Tutor.

You can help with any subject relevant to the student's examination.
If the student's question clearly belongs to a particular subject,
answer it directly. If the subject is unclear and knowing it would
materially improve the answer, ask the student to clarify.
`
      : `
The student is using the ${subject} AI Tutor.

Keep your explanation focused primarily on ${subject}.
`

    const systemPrompt = `
You are EduDrill AI Tutor, an educational AI assistant for Nigerian secondary-school students.

Your responsibilities:
- Explain academic concepts clearly and simply.
- Help students prepare for WAEC, NECO, GCE and JAMB.
- Give step-by-step explanations when useful.
- Use examples when they improve understanding.
- Encourage understanding rather than simply giving answers.
- Adapt explanations to the student's level.
- Be patient and educational.
- If the student makes a mistake, explain the correction clearly.
- Never claim an AI-generated question is an official past question.
- Never invent official examination information.
- If you are uncertain about current examination information, say so.
- Do not pretend that you have browsed the internet unless browsing has actually been provided.
- Maintain continuity with the conversation when previous messages are provided.

Current examination:
${exam || "Not specified"}

Current subject:
${subject || "General / All Subjects"}

Current topic:
${topic || "Not specified"}

${tutorContext}

The student may ask follow-up questions such as:
"Explain that again."
"What about the second one?"
"Give me another example."
"Why is that the answer?"

Use the conversation history to understand what those follow-up questions refer to.
`

    // ----------------------------------------
    // BUILD CONVERSATION
    // ----------------------------------------

    const conversation = []

    conversation.push({
      role: "system",
      content: systemPrompt,
    })

    // Keep only the most recent messages.
    // This prevents the request from becoming unnecessarily large.
    const previousMessages = Array.isArray(messages)
      ? messages.slice(-20)
      : []

    for (const item of previousMessages) {
      if (
        !item ||
        !item.role ||
        !item.content
      ) {
        continue
      }

      if (
        item.role !== "user" &&
        item.role !== "assistant"
      ) {
        continue
      }

      conversation.push({
        role: item.role,
        content: String(item.content),
      })
    }

    // Add the current message.
    conversation.push({
      role: "user",
      content: message.trim(),
    })

    // ----------------------------------------
    // OPENROUTER REQUEST
    // ----------------------------------------

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "openrouter/free",

          messages: conversation,

          temperature: 0.7,
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      console.error(
        "OpenRouter error:",
        data,
      )

      return res.status(response.status).json({
        success: false,
        message:
          data?.error?.message ||
          "OpenRouter request failed.",
      })
    }

    const answer =
      data?.choices?.[0]?.message?.content

    if (!answer) {
      return res.status(500).json({
        success: false,
        message:
          "The AI returned an empty response.",
      })
    }

    // ----------------------------------------
    // RESPONSE
    // ----------------------------------------

    return res.json({
      success: true,
      answer,
      sources: [],
    })
  } catch (error) {
    console.error(
      "AI Tutor error:",
      error,
    )

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "AI Tutor could not process your request.",
    })
  }
}

module.exports = {
  chatWithTutor,
}