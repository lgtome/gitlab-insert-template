const nullthrows = (v) => {
    if (v == null) throw new Error("it's a null")
    return v
}

function injectCode(src) {
    const script = document.createElement('script')
    // This is why it works!
    script.src = src
    script.onload = function () {
        this.remove()
    }

    // This script runs before the <head> element is created,
    // so we add the script to <html> instead.
    nullthrows(document.head || document.documentElement).appendChild(script)
}

injectCode(chrome.runtime.getURL('/myscript.js'))
function getTextArea() {
    const form = document.querySelector('.merge-request-form')
    if (form) {
        const textArea = form.querySelector('.note-textarea')
        return textArea
    } else {
        return false
    }
}
function syncWithLocalStorage(node) {
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
function insertTemplate(node) {
    chrome.storage.local.get('text', (data) => {
        const template = data?.text
        node.value = template
        resizeByRows(node)
    })
}
function insertWhenAuto(node) {
    chrome.storage.local.get('auto', ({ auto }) => {
        if (auto) {
            !node.value && insertTemplate(node)
        }
    })
}
function subscribe(node) {
    syncWithLocalStorage()
    insertWhenAuto(node)
    chrome.storage.local.set({ click: false })
    chrome.storage.onChanged.addListener(function ({ click, auto }) {
        if (click?.newValue || click?.oldValue) {
            insertTemplate(node)
        }
        if (auto?.newValue || auto?.oldValue) {
            insertWhenAuto(node)
        }
    })
}
subscribe(getTextArea())
