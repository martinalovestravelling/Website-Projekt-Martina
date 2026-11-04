(function () {
  "use strict";
  var STORAGE_KEY = "lang-pref";
  var toggle = document.getElementById("lang-toggle");
  if (!toggle) return;

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "de") {
      toggle.checked = true;
    } else if (saved === "en") {
      toggle.checked = false;
    }
  } catch (e) {
    // localStorage unavailable (private mode, blocked storage, …) — falls back to the EN default.
  }

  toggle.addEventListener("change", function () {
    try {
      localStorage.setItem(STORAGE_KEY, toggle.checked ? "de" : "en");
    } catch (e) {
      // Persistence just won't work this session.
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
