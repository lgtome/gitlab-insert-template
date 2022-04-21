function subscribe() {
    getTextArea()
    syncWithLocalStorageIfTemplateNotProvided()
}

subscribe()

function syncWithLocalStorageIfTemplateNotProvided() {
    chrome.storage.local.get('text', (data) => {
        if (data) return

        const filtered = Object.keys(localStorage).filter((key) => {
            if (key.includes('autosave')) {
                return key
            }
        })
        const templateFromStorage =
            localStorage.getItem(filtered.length && filtered[0]) || false

        if (templateFromStorage) {
            chrome.storage.local.set({ text: templateFromStorage })
        }
    })
}

function insertTemplate(node) {
    chrome.storage.local.get('text', (data) => {
        const template = data?.text
        node.value = template
        resizeByRows(node)
    })
}

function mountButton(isMountNeeded) {
    if (isMountNeeded) {
        const templateInsertButton = document.createElement('div')
        templateInsertButton.innerHTML = '&#9998; insert template'
        templateInsertButton.style.float = 'right'
        templateInsertButton.style.padding = '0 10px'
        templateInsertButton.style.cursor = 'pointer'
        templateInsertButton.style.color = '#1f75cb'
        document
            .querySelector('.uploading-container')
            .after(templateInsertButton)
        return templateInsertButton
    }
    return false
}

function getTextArea() {
    const form = document.querySelector('.merge-request-form')
    if (form) {
        const textArea = form.querySelector('.note-textarea')
        const button = mountButton(!!textArea)
        if (button)
            button.onclick = () => {
                insertTemplate(textArea)
            }
        return textArea
    } else {
        return false
    }
}

function resizeByRows(node) {
    const rowsToChange = 6
    const defaultHeight = 140
    const rowsCount = node.value && node.value.split('\n').length
    if (rowsCount > rowsToChange) {
        const multiplier = rowsCount - rowsToChange
        const step = 18
        node.style.height = `${defaultHeight + step * multiplier}px`
    }
}
