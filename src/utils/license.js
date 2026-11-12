export const FREE_SUBJECTS = ['general-mathematics', 'english-language', 'use-of-english', 'civic-education'];

export function isProductActivated() {
  const licenseStr = localStorage.getItem("edudrill_license");
  if (!licenseStr) return false;
  try {
    const license = JSON.parse(licenseStr);
    const isActive = license.status && license.status.toLowerCase().includes('activ');
    return Boolean(isActive);
  } catch (e) {
    console.error("Error parsing license", e);
    return false;
  }
}

