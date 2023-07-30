// compile functions
import raw_randomNumberGen from './randomNumberGen.js?raw';
import raw_compileVarSection from './compileVarSection.js?raw';

import javascriptGenerator from '../javascriptGenerator';

class Compiler {
    /**
     * Generates JavaScript code from the provided workspace & image info.
     * @param {Blockly.Workspace} workspace 
     * @param {object} imageStates 
     * @returns {string} Generated code.
     */
    compile(workspace, imageStates) {
        const code = javascriptGenerator.workspaceToCode(workspace);

        const headerCode = [
            `/*`,
            `   This extension was made with TurboBuilder!`,
            `   https://turbobuilder.vercel.app/`,
            `*/`,
            `(function (Scratch) {`,
            `const variables = {};`
        ];
        const classRegistry = {
            top: [
                `class Extension {`
            ],
            bottom: [
                `}`
            ]
        }
        const footerCode = [
            `Scratch.extensions.register(new Extension());`,
            `})(Scratch);`
        ];

        if (imageStates) {
            if (imageStates.icon.image) {
                // add icon uri
                const url = imageStates.icon.image;
                headerCode.push(`const categoryIconURI = ${JSON.stringify(url)};`);
            }
        }

        return [].concat(headerCode, classRegistry.top, classRegistry.bottom, code, footerCode).join('\n');
    }
}

export default Compiler;