# Implementation notes

- The current public site is https://illuminated.neuronaut.live.
- The homepage estimate form is the single customer-facing estimator and quote-request path.
- /calculator.html is retained only as a redirect shim to /#estimate for old bookmarks and indexed links; it contains no calculator UI or pricing logic.
- Estimate requests use the existing lead endpoint and include the selected package, light color, add-ons, visible estimate (when included), customer details, and optional photos. The configured form recipient remains illuminatedforms@neuronaut.live.
- Add-on pricing shown in the homepage estimator must stay synchronized with the quoteItems values in js/main.js.
- The Cloudflare leads backend currently uses the illuminated-leads D1 database and illuminated-lead-photos R2 bucket. Do not change those bindings for frontend estimator edits.
- https://neuronaut.live/illuminated is outdated. Update it or redirect it to https://illuminated.neuronaut.live/ so visitors have one consistent current experience.
