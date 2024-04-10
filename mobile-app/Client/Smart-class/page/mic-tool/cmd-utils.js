export default function commandParser(text) {
    const textClean = text.trim().toLowerCase();
    let textArr = textClean.split(" ");
    textArr = textArr.filter(w => w !== "")
    let rt_cmdDevice = [];
    let rt_cmdArg = [];
    for (let i = 0; i < textArr.length; i++) {
        const element = textArr[i];
        if (element in preDefineValidCmds) {
            rt_cmdDevice.push(element);
        }
        if (preDefineValidArgs.includes(element)) {
            rt_cmdArg.push(element);
        }
    }
    const validCmd = [];
    if (rt_cmdArg.length === 0 || rt_cmdDevice.length === 0) throw new Error("Can not parse command");
    rt_cmdDevice.forEach(cmd => {
        rt_cmdArg.forEach(arg => {
            console.log("[-] candidate cmd:" + cmd + " " + arg)
            if (arg in preDefineValidCmds[cmd]) {
                //invoke
                preDefineValidCmds[cmd][arg]();
                validCmd.push(cmd + " " + arg);
            }
        });
    });
    console.log(validCmd);
    return validCmd;
}
///////
const preDefineValidArgs = ["on", "off", "start", "end"]
const preDefineValidCmds = {
    "light": {
        "on": () => console.log("LIGHT ON"),
        "off": () => console.log("LIGHT OFF")
    },
    "fan": {
        "on": () => console.log("FAN ON"),
        "off": () => console.log("FAN OFF")
    },
}
