// Debug script to diagnose the active path issue
console.log('=== Active Path Detection Debug ===')
console.log('Current URL:', window.location.href)
console.log('Current pathname:', window.location.pathname)

const tabs = document.querySelectorAll('nav a[data-active]')

if (tabs.length === 0) {
  console.log('❌ No tabs found with data-active attribute!')
  console.log('Trying alternative selector...')
  const altTabs = document.querySelectorAll('nav a')
  console.log('Found', altTabs.length, 'navigation links')
  altTabs.forEach((tab, i) => {
    console.log(`Link ${i + 1}:`, {
      href: tab.getAttribute('href'),
      text: tab.textContent.trim(),
      classes: tab.className,
      dataActive: tab.getAttribute('data-active')
    })
  })
} else {
  console.log(`Found ${tabs.length} tabs`)

  tabs.forEach((tab, index) => {
    const isActive = tab.getAttribute('data-active') === 'true'
    const debugInfo = {
      name: tab.textContent.trim(),
      href: tab.getAttribute('href'),
      active: isActive,
      pathname: tab.getAttribute('data-debug-pathname'),
      locale: tab.getAttribute('data-debug-locale'),
      tabHref: tab.getAttribute('data-debug-tab-href'),
      localizedPath: tab.getAttribute('data-debug-localized-path'),
      dataActive: tab.getAttribute('data-active')
    }

    console.log(`\nTab ${index + 1}:`, debugInfo)

    if (isActive) {
      console.log('✓ This tab is marked as ACTIVE')
    }
  })
}

console.log('\n=== End of Debug ===')
