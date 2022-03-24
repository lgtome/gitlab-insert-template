const insertButton = document.getElementById('insert')
const saveButton = document.getElementById('save')
const toggleButton = document.getElementById('toggle')
const textArea = document.getElementById('area')

function toggleButtonVision(node, isVisible) {
    if (isVisible) node.style.visibility = 'visible'
    else node.style.visibility = 'hidden'
}

chrome.storage.local.get('auto', (value) => {
    if (value?.auto) {
        toggleButton.checked = value.auto
        toggleButtonVision(insertButton, !value.auto)
    }
})
toggleButton.addEventListener('click', (event) => {
    chrome.storage.local.set({ auto: event.target.checked })
    toggleButtonVision(insertButton, !event.target.checked)
})

insertButton.addEventListener('click', () => {
    chrome.storage.local.set({ click: Math.random() })
})
saveButton.addEventListener('click', () => {
    chrome.storage.local.set({ text: textArea.value })
})
chrome.storage.local.get('text', (value) => {
    textArea.value = value?.text || 'Insert template using **markdown** here!'
})
