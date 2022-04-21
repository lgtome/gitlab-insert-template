function insertTemplate(node) {
    chrome.storage.local.get('text', (data) => {
        const template = data?.text
        node.value = template
        resizeByRows(node)
    })
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
globalThis.insertTemplate = insertTemplate
