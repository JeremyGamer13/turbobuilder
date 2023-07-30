// compile functions
import raw_randomNumberGen from './randomNumberGen.js?raw';
import raw_compileVarSection from './compileVarSection.js?raw';

import javascriptGenerator from '../javascriptGenerator';

class Compiler {
    /**
     * Generates JavaScript code from the provided workspace.
     * @param {Blockly.Workspace} workspace 
     * @returns {string} Generated code.
     */
    compile(workspace) {
        const code = javascriptGenerator.workspaceToCode(workspace);

        const headerCode = [
            `/*`,
            `   This extension was made with TurboBuilder!`,
            `   https://turbobuilder.vercel.app/`,
            `*/`,
            `(function (Scratch) {`,
            `const variables = {};`,
            raw_compileVarSection,
            raw_randomNumberGen
        ];
        const footerCode = [
            `Scratch.extensions.register(new Extension());`,
            `})(Scratch);`
        ];

        return [].concat(headerCode, code, footerCode).join('\n');
    }
}

export default Compiler;