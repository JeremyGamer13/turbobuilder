import Blockly from "blockly/core";
import javascriptGenerator from '../javascriptGenerator';

function xmlToCode(xml) {
    // this sucks but i dont know any other method
    // make div
    const tempDiv = document.createElement("div");
    tempDiv.style = "display:none";
    document.body.append(tempDiv);
    // inject workpace
    const workspace = Blockly.inject(tempDiv, {
        collapse: true,
        comments: true,
        scrollbars: true,
        disable: false
    });

    let code = "";
    try {
        const dom = Blockly.utils.xml.textToDom(xml);
        Blockly.Xml.domToWorkspace(dom, workspace);
        // yay we get to compile now
        code = javascriptGenerator.workspaceToCode(workspace);
    } catch (err) {
        // we do try catch so if we fail to parse
        // we dont leave behind an entire workspace & div in the document
        console.warn("could not compile xml;", err);
    }

    // gtfo
    workspace.dispose();
    tempDiv.remove();

    return code;
}

export default xmlToCode;