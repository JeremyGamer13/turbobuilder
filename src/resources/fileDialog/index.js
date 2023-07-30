// file-dialog exists on NPM and thats what this file is
// however it uses module.exports and exports a function
// which vite absolutely HATES and REFUSES to build no matter what
// so its reimplemented here with a few changes to work

function fileDialog(...args) {
    const input = document.createElement('input');

    // Set config
    if (typeof args[0] === 'object') {
        if (args[0].multiple === true) input.setAttribute('multiple', '');
        if (args[0].accept !== undefined) input.setAttribute('accept', args[0].accept);
    }
    input.setAttribute('type', 'file');

    // IE10/11 Addition
    input.style.display = 'none';
    input.setAttribute('id', 'hidden-file');
    document.body.appendChild(input);

    // Return promise/callvack
    return new Promise(resolve => {
        input.addEventListener('change', () => {
            resolve(input.files);
            const lastArg = args[args.length - 1];
            if (typeof lastArg === "function") lastArg(input.files);

            // IE10/11 Addition
            document.body.removeChild(input);
        })

        // Simluate click event
        input.click();
    })
}

export default fileDialog;