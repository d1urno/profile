function checkDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

function watchDarkMode() {
  if (!window.matchMedia) return
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', addDarkModeSelector)
}

function addDarkModeSelector() {
  if (checkDarkMode()) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

addDarkModeSelector()
watchDarkMode()
