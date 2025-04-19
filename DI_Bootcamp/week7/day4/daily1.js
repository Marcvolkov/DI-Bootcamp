
function transform(str) {
    const notIndex = str.indexOf("not");
    const badIndex = str.indexOf("bad");
    if (notIndex !== -1 && badIndex !== -1 && badIndex > notIndex) {
      return str.slice(0, notIndex) + "good" + str.slice(badIndex + 3);
    }
    return str;
  }
  
  const sentences = [
    "The movie is not that bad, I like it",
    "This dinner is not that bad ! You cook well",
    "This movie is not so bad !",
    "This dinner is bad !"
  ];
  
  sentences.forEach(s => {
    console.log(transform(s));
  });
  