# Ask the report: Cloudflare Worker

`worker.js` is the service behind the site's "Ask the report" chat box. It runs on Cloudflare Workers (free plan) with a Workers AI binding named `AI`.

It answers only from the report text embedded in the file: it searches the report first, sends the AI only the matching passages, rejects answers without citations, and withholds any answer containing a figure that does not appear in the cited passages. Otherwise it replies "The report doesn't cover that."

To switch the chat box on, set `data-endpoint` on the `chat.js` script tag in every page to the Worker's URL.
