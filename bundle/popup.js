const textArea = document.getElementById('area')

const DEFAULT_TEXT = 'Insert template using **markdown** here!'
textArea.addEventListener('change', (event) => {
    const text = event.target.value || DEFAULT_TEXT
    chrome.storage.local.set({ text })
})
chrome.storage.local.get('text', (value) => {
    if (value?.text) {
        textArea.value = value.text
    }
})
