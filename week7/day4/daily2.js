let line = "";
for (let i = 1; i <= 6; i++) {
  line += "* ";          
  console.log(line.trim());
}

for (let i = 1; i <= 6; i++) {
    let line = "";
    for (let j = 1; j <= i; j++) {
      line += "* ";
    }
    console.log(line.trim());
  }
  