# Preset question-bank import

The importer accepts question records for WAEC, NECO, GCE, and JAMB. Each record maps to an active EduDrill subject by slug, so it is not limited to a hard-coded subject list or a single provider.

Provide either a JSON array or an object with a `questions` array:

```json
{
  "questions": [
    {
      "exam": "WAEC",
      "subject": "general-mathematics",
      "year": "2024",
      "question": "Question text from your authorized source",
      "options": { "A": "Option A", "B": "Option B", "C": "Option C", "D": "Option D" },
      "correctAnswer": "B",
      "sourceName": "Source name",
      "sourceProvider": "provider-id",
      "sourceExternalId": "provider-question-id",
      "sourceUrl": "https://example.com/question",
      "licenseStatus": "pending",
      "verificationStatus": "pending"
    }
  ]
}
```

`exam`, `subject`, `question`, all four options, `correctAnswer`, `sourceName`, `sourceProvider`, and `sourceExternalId` are required. Optional fields are `year`, `explanation`, `difficulty` (`easy`, `medium`, `hard`), `marks`, `questionNumber`, `paperSection`, and `sourceUrl`. Licensing and verification statuses default to `pending`.

From the `server` directory, validate the JSON and subject mappings before inserting:

```sh
npm run import-question-bank -- --file=./question-bank.json --dry-run
npm run import-question-bank -- --file=./question-bank.json
```

The API can filter imported questions by exam, subject slug, source type, year, and provider. For example: `/api/questions?exam=WAEC&subject=general-mathematics&sourceType=past_question&sourceProvider=provider-id`.

Only import material whose redistribution terms permit use in EduDrill. The importer stores supplied records; it does not scrape third-party sites. Review rights and verify answers before making source content available to students.

## Original Preset Practice

EduDrill also provides a separate original practice set for every active exam-subject mapping. These are practice questions, not official WAEC, NECO, GCE, or JAMB past questions. Students open them from the subject workspace using **Preset Questions**.

From the `server` directory:

```sh
npm run build-preset-question-bank
npm run seed-preset-questions
node checkPresetQuestionCoverage.js
```

The local builder completes missing subject sets without an external API. The seeder is idempotent; it can be rerun safely. The coverage check reports preset counts for each active examination.
