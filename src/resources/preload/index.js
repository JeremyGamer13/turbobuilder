/**
 * Preloads all audio files specified.
 * This is because the hosted version of TurboBuilder will cause a bit of a delay before playing audio
 * due to the host having to provide the file, not the local machine.
 * @param {Array} files An array full of file paths to audio files.
 */
function preload(files) {
    for (const path of files) {
        new Audio(path);
    }
}

export default preload;