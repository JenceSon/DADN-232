export default function commandParser(text) {
    //text -> cmd: {command} {arg}
    const cmdDevice = ["light", "mic"];
    const cmdArg = ["on", "off"];
    const textClean = text.trim().toLowerCase();
    const textArr = textClean.split(" ");
    let rt_cmdDevice = "";
    let rt_cmdArg = "";
    for (let i = 0; i < textArr.length; i++) {
        const element = textArr[i];
        if (cmdDevice.includes(element)) {
            rt_cmdDevice = element;
        }
        if (cmdArg.includes(element)) {
            rt_cmdArg = element;
        }
    }
    if (rt_cmdArg === "" || rt_cmdDevice === "") throw new Error("Can not parse cammand");
    return rt_cmdDevice + " " + rt_cmdArg;
}
export function commandInvoker({ cmd }) {
    //invoke action from a cmd
    const cmdArr = cmd.split(" ");
    if (cmdArr[0] == "light") {
        //fire action 
    }
}