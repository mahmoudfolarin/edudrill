require("dotenv").config()

const pool = require("./src/config/database")

async function seedLessons() {
  try {
    const topicResult = await pool.query(
      `
      SELECT id
      FROM topics
      WHERE slug = $1
      LIMIT 1
      `,
      ["number-bases"],
    )

    if (topicResult.rows.length === 0) {
      throw new Error(
        "Number Bases topic was not found.",
      )
    }

    const topicId = topicResult.rows[0].id

    const subtopicResult = await pool.query(
      `
      SELECT id
      FROM subtopics
      WHERE
        topic_id = $1
        AND slug = $2
      LIMIT 1
      `,
      [
        topicId,
        "conversion-from-base-10-to-other-bases",
      ],
    )

    if (subtopicResult.rows.length === 0) {
      throw new Error(
        "Required subtopic was not found.",
      )
    }

    const subtopicId =
      subtopicResult.rows[0].id

    const lessonContent = `
<h2>Introduction</h2>

<p>
A number base is a system used to represent numbers using a
particular set of digits. The base tells us how many different
digits are available in that number system.
</p>

<p>
The decimal number system that we normally use is called
<strong>base 10</strong>. It uses the digits 0 to 9.
</p>

<p>
Other common number systems include base 2, base 5, base 8
and base 16.
</p>

<h2>Converting a Base 10 Number to Another Base</h2>

<p>
To convert a decimal number to another base, repeatedly divide
the number by the new base and record the remainder at each step.
Continue until the quotient becomes zero.
</p>

<h3>Example: Convert 25₁₀ to base 2</h3>

<p>
Divide 25 by 2:
</p>

<p>
25 ÷ 2 = 12 remainder 1
</p>

<p>
12 ÷ 2 = 6 remainder 0
</p>

<p>
6 ÷ 2 = 3 remainder 0
</p>

<p>
3 ÷ 2 = 1 remainder 1
</p>

<p>
1 ÷ 2 = 0 remainder 1
</p>

<p>
Now read the remainders from bottom to top:
</p>

<p>
<strong>11001₂</strong>
</p>

<p>
Therefore:
</p>

<p>
<strong>25₁₀ = 11001₂</strong>
</p>

<h2>Important Rule</h2>

<p>
When converting from base 10 to another base, always read the
remainders from the last division back to the first division.
</p>

<h2>Key Points</h2>

<ul>
  <li>Base 10 uses the digits 0 to 9.</li>
  <li>Repeated division is used to convert from base 10.</li>
  <li>The remainder is recorded after every division.</li>
  <li>The final answer is obtained by reading the remainders from bottom to top.</li>
</ul>
`

    const result = await pool.query(
      `
      INSERT INTO lessons
      (
        topic_id,
        subtopic_id,
        title,
        slug,
        content,
        lesson_order,
        is_active
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        TRUE
      )
      ON CONFLICT (topic_id, slug)
      DO UPDATE SET
        subtopic_id = EXCLUDED.subtopic_id,
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        lesson_order = EXCLUDED.lesson_order,
        is_active = TRUE
      RETURNING *
      `,
      [
        topicId,
        subtopicId,
        "Converting Base 10 Numbers to Other Bases",
        "converting-base-10-numbers-to-other-bases",
        lessonContent,
        1,
      ],
    )

    console.log(
      "Lesson created successfully:",
    )

    console.log(
      `Lesson ID: ${result.rows[0].id}`,
    )

    console.log(
      `Title: ${result.rows[0].title}`,
    )
  } catch (error) {
    console.error(
      "Lesson seeding failed:",
    )

    console.error(error)
  } finally {
    await pool.end()
  }
}

seedLessons()