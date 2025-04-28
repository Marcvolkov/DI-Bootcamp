(function(numChildren, partnerName, geoLocation, jobTitle) {
    const message = 
      `You will be a ${jobTitle} in ${geoLocation}, and married to ${partnerName} with ${numChildren} kids.`;
  
    // Find the target div and display the message
    document.getElementById('fortune').textContent = message;
  })(
    3,            // number of children
    'Alice',      // partner’s name
    'Paris',      // geographic location
    'Engineer'    // job title
  );
  