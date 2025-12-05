window.ThemeToggle = (function () {
  function init(options) {
    const toggleBtn = document.querySelector(options.toggleSelector);
    const icon = document.querySelector(options.iconSelector);
    const storageKey = options.storageKey || "theme";
    const preferBody = options.preferBody || false;

    if (!toggleBtn) return;

    function setTheme(theme) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
        if (preferBody && document.body) {
          document.body.classList.add("dark");
          document.body.classList.remove("light");
        }
        if (icon) {
          icon.classList.remove("bi-moon-fill");
          icon.classList.add("bi-sun-fill");
        }
        // Update inline background color to match dark theme
        document.documentElement.style.backgroundColor = "#0b1220";
        if (document.body) document.body.style.backgroundColor = "#0b1220";
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        if (preferBody && document.body) {
          document.body.classList.add("light");
          document.body.classList.remove("dark");
        }
        if (icon) {
          icon.classList.remove("bi-sun-fill");
          icon.classList.add("bi-moon-fill");
        }
        // Update inline background color to match light theme
        document.documentElement.style.backgroundColor = "#ffffff";
        if (document.body) document.body.style.backgroundColor = "#ffffff";
      }
      localStorage.setItem(storageKey, theme);
    }

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem(storageKey);
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const currentTheme = savedTheme || (systemDark ? "dark" : "light");

    setTheme(currentTheme);

    toggleBtn.addEventListener("click", function () {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "light" : "dark");
    });
  }

  return {
    init: init,
  };
})();
