chrome.commands.onCommand.addListener((command) => {
    if (command === 'reload') {
        chrome.runtime.reload()
    }
})
