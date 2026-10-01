# Implementation notes

- The current public site is https://illuminated.neuronaut.live.
- The public calculator is available at /calculator.html and uses the same lead endpoint as the photo-estimate form.
- Calculator requests include the selected package, light color, add-ons, and visible estimate in their lead notes. The configured form recipient is illuminatedforms@neuronaut.live.
- https://neuronaut.live/illuminated is outdated. Update it or redirect it to https://illuminated.neuronaut.live/ so visitors have one consistent current experience.
- Walkway allowance is intentionally easy to update in js/calculator.js: change WALKWAY_INCLUDED_FEET.
