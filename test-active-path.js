// Test script to verify active path detection in production
// Run this in the browser console on the deployed site

function testActivePathDetection() {
  console.log('=== Active Path Detection Test ===')
  console.log('Current URL:', window.location.href)
  console.log('Current pathname:', window.location.pathname)

  const tabs = document.querySelectorAll('nav a[data-active]')

  tabs.forEach((tab, index) => {
    const isActive = tab.getAttribute('data-active') === 'true'
    const debugInfo = {
      name: tab.textContent.trim(),
      href: tab.getAttribute('href'),
      active: isActive,
      pathname: tab.getAttribute('data-debug-pathname'),
      locale: tab.getAttribute('data-debug-locale'),
      tabHref: tab.getAttribute('data-debug-tab-href'),
      localizedPath: tab.getAttribute('data-debug-localized-path')
    }

    console.log(`\nTab ${index + 1}:`, debugInfo)

    if (isActive) {
      console.log('✓ This tab is marked as ACTIVE')
    }
  })

  console.log('\n=== End of Test ===')
}

// Run the test
testActivePathDetection()
