window.ILLUMINATED_CONFIG = {
  estimateEmail: "illuminatedforms@neuronaut.live",
  formRecipient: "illuminatedforms@neuronaut.live",
  leadsApiBaseUrl: "https://illuminated-leads-api.illuminatedforms.workers.dev",
  turnstileSiteKey: "0x4AAAAAAEFEGxyPMHxzXw9n",
  phoneDisplay: "254-900-2002",
  phoneHref: "+12549002002"
};

// Use the revised transparent reversed logo anywhere the brand sits on a dark background.
document.querySelectorAll(".site-header .brand-logo, .site-footer .brand-logo").forEach((logo) => {
  logo.src = "20261003_illuminated_logo_reverse_transparent_revised_2.jpg";
});
