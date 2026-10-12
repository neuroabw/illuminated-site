window.ILLUMINATED_CONFIG = {
  estimateEmail: "illuminatedforms@neuronaut.live",
  formRecipient: "illuminatedforms@neuronaut.live",
  leadsApiBaseUrl: "https://illuminated-leads-api.illuminatedforms.workers.dev",
  turnstileSiteKey: "0x4AAAAAAEFEGxyPMHxzXw9n",
  phoneDisplay: "254-227-6094",
  phoneHref: "+12542276094"
};

// Use the approved reversed logo asset on dark site backgrounds.
document.querySelectorAll(".site-header .brand-logo, .site-footer .brand-logo").forEach((logo) => {
  logo.src = "IMG_8529.png";
});

// Keep the homepage estimate form as the single customer estimate path.
document.querySelectorAll('a[href="calculator.html"], a[href="/calculator.html"]').forEach((link) => {
  link.href = "#estimate";
});

document.querySelector("#start")?.remove();

const estimateSection = document.querySelector("#estimate");
if (estimateSection) {
  const eyebrow = estimateSection.querySelector(".estimate-copy .eyebrow");
  const heading = estimateSection.querySelector(".estimate-copy h2");
  const intro = estimateSection.querySelector(".estimate-copy > p:not(.eyebrow)");
  const builderEyebrow = estimateSection.querySelector(".quote-builder-head .eyebrow");
  const builderHeading = estimateSection.querySelector("#quote-builder-title");
  const builderIntro = estimateSection.querySelector(".quote-intro");
  const includeCheckbox = estimateSection.querySelector("#quoteInclude");

  if (eyebrow) eyebrow.textContent = "Free starting estimate";
  if (heading) heading.textContent = "Build it here. Send it once.";
  if (intro) intro.textContent = "Choose a starting package, add any details you want, then send the same request with your contact information and optional property photos. One estimator, one quote request.";
  if (builderEyebrow) builderEyebrow.textContent = "Your starting estimate";
  if (builderHeading) builderHeading.textContent = "Build your estimate.";
  if (builderIntro) builderIntro.textContent = "Choose the package and details that fit what you have in mind. The estimate stays with this same request form—there is no second calculator or handoff.";
  if (includeCheckbox) includeCheckbox.checked = false;

  const addonPrices = {
    "Extra roofline": "+$70 per 10 ft",
    "Simple peak": "+$95 each",
    "Tree trunk": "+$110 each",
    "Tree with limbs": "+$200 each",
    "Wreath": "+$220 each",
    "Walkway lighting": "+$175, up to 30 ft",
    "Lit window": "+$70 each",
    "Shrub accent": "+$70 each"
  };

  estimateSection.querySelectorAll(".quote-addons > div").forEach((row) => {
    const label = row.querySelector("strong")?.textContent?.trim();
    const detail = row.querySelector("small");
    const price = label ? addonPrices[label] : "";
    if (detail && price && !detail.textContent.includes(price)) {
      detail.textContent = `${detail.textContent.trim()} · ${price}`;
    }
  });
}
