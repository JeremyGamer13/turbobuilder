const throwAwayVars = {}; // used for repeat loops
const compileVars = {};
compileVars._idx = 0;
compileVars.new = () => {
    const _listLow = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const _listHigh = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const _listSym = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '&', '(', ')', '_', '-', '+', '=', '[', ']', '|'];
    const list = [].concat(_listLow, _listHigh, _listSym);
    let str = '';
    for (let i = 0; i < 100; i++) {
        str += list[Math.round(Math.random() * (list.length - 1))];
    };
    return str;
};
compileVars.next = () => {
    compileVars._idx++;
    return `v${compileVars._idx}`;
};