const fs = require("fs")
let tweetext = fs.readFileSync("tweetext.txt").toString()
let twee = []
let fin = ""

function regsearch(regex, string) {
  if (regex.test(string)) {
    let gee = string;
    gee = gee.slice(2)
    gee = gee.slice(0, -2)
    return gee
  } else {
    return " "
  }
}

let e = tweetext.split(":: ")

e = e.slice(3)

for (let i = 0; i < e.length; i++) {
  let splited = e[i].split("\n")

  twee.push([
    splited[0].replace(/\{[^}]*\}/i, "").trim(),
    splited[1],
    [
      regsearch(/\[\[([^\]]*)\]\]/, splited[3]),
      regsearch(/\[\[([^\]]*)\]\]/, splited[4]),
      regsearch(/\[\[([^\]]*)\]\]/, splited[5])
    ]
  ])
}


fs.writeFileSync("Compiled.json", (JSON.stringify(twee, "\n")))

fin += "@echo off\n"
fin += "goto end\n"
for (let i = 0; i < twee.length; i++) {
  fin += "\n:" + twee[i][0]
  fin += "\necho " + twee[i][0]
  fin += "\necho " + twee[i][1]
  fin += "\necho 1. " + twee[i][2][0]
  fin += "\necho 2. " + twee[i][2][1]
  fin += "\necho 3. " + twee[i][2][2]
  fin += "\nset /p input=select option:"
  fin += "\nif %input%==1 goto " + twee[i][2][0]
  fin += "\nif %input%==2 goto " + twee[i][2][1]
  fin += "\nif %input%==3 goto " + twee[i][2][2]
  fin += "\n"
}
fin += ":end"
fin += "\ngoto " + twee[0][0]
fs.writeFileSync("Compiled.bat", fin)
