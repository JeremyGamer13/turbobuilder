import Blockly from 'blockly/core';
import javascriptGenerator from '../javascriptGenerator';

export default (blockName, jsonData, compileFunction) => {
    const blockObject = {
        init: function () {
            this.jsonInit(jsonData);
        }
    };

    // register visual block
    Blockly.Blocks[blockName] = blockObject

    // register block compile function
    javascriptGenerator[blockName] = compileFunction;
}