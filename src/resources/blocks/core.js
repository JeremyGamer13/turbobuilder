import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'core_';
const categoryColor = '#ff4b4b';

function register() {
    // used in block creation menu
    registerBlock(`${categoryPrefix}builderblock`, {
        message0: '⠀', // empty character breaks block shape
        args0: [],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, () => {
        return `void;`;
    });
}

export default register;
