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
