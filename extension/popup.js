document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.tool-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      if (url) {
        if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
          chrome.tabs.create({ url });
        } else {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      }
    });
  });
});
