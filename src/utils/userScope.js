/**
 * Utility to reliably identify the current student/device
 * ensuring each client/browser maintains isolated performance stats and bookmarks.
 */
export function getUserIdentifier() {
  try {
    const studentData = localStorage.getItem("student_data");
    if (studentData) {
      const parsed = JSON.parse(studentData);
      if (parsed?.id) return `user_${parsed.id}`;
      if (parsed?.email) return `user_${parsed.email}`;
    }

    let deviceId = localStorage.getItem("edudrill_device_id");
    if (!deviceId) {
      if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        deviceId = crypto.randomUUID();
      } else {
        deviceId = "device_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
      }
      localStorage.setItem("edudrill_device_id", deviceId);
    }
    return deviceId;
  } catch {
    return "anonymous_device";
  }
}
