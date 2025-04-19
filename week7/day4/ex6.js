const details = {
    my: 'name',
    is: 'Rudolf',
    the: 'reindeer'
  };
  
  // Build the sentence by iterating over the object’s keys
  let sentence = "";
  for (let key in details) {
    sentence += key + " " + details[key] + " ";
  }
  
  // Trim the trailing space and log the full sentence
  console.log(sentence.trim());
  // → "my name is Rudolf the reindeer"
  