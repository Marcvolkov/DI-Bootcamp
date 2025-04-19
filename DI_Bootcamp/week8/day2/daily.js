document.addEventListener('DOMContentLoaded', () => {
    const form      = document.getElementById('libform');
    const shuffleBtn = document.getElementById('shuffle-button');
    const storySpan = document.getElementById('story');
  
    // 1) Define several story templates (must include all five placeholders)
    const templates = [
      ({ noun, adjective, person, verb, place }) =>
        `One day, ${person} found a ${adjective} ${noun} in the middle of ${place} and decided to ${verb} it.`,
  
      ({ noun, adjective, person, verb, place }) =>
        `${person} went to ${place} to buy a ${adjective} ${noun}, but instead ended up ${verb}ing around town.`,
  
      ({ noun, adjective, person, verb, place }) =>
        `In ${place}, ${person} saw a ${noun} so ${adjective} that they had to ${verb} on the spot.`,
  
      ({ noun, adjective, person, verb, place }) =>
        `Legend says that whoever ${verb}s a ${adjective} ${noun} in ${place} will be blessed by ${person}.`
    ];
  
    // 2) Helper: read & validate inputs
    function getInputs() {
      const noun      = document.getElementById('noun').value.trim();
      const adjective = document.getElementById('adjective').value.trim();
      const person    = document.getElementById('person').value.trim();
      const verb      = document.getElementById('verb').value.trim();
      const place     = document.getElementById('place').value.trim();
  
      if (!noun || !adjective || !person || !verb || !place) {
        alert('Please fill in all five fields before generating your story.');
        return null;
      }
  
      return { noun, adjective, person, verb, place };
    }
  
    // 3) Generate and display one story (by index)
    function displayStory(data, templateIndex) {
      const template = templates[templateIndex];
      storySpan.textContent = template(data);
    }
  
    // 4) On form submit → generate first story
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = getInputs();
      if (!data) return;
  
      // pick a random template for the first story
      const idx = Math.floor(Math.random() * templates.length);
      displayStory(data, idx);
  
      // enable shuffle button now that we have a story
      shuffleBtn.disabled = false;
      // store current data & last index so shuffle doesn’t repeat same
      form.currentData = data;
      form.lastIdx    = idx;
    });
  
    // 5) Bonus: shuffle button picks a different random template
    shuffleBtn.addEventListener('click', () => {
      const data = form.currentData;
      if (!data) return;
  
      let idx;
      // ensure we get a different template than last time
      do {
        idx = Math.floor(Math.random() * templates.length);
      } while (idx === form.lastIdx && templates.length > 1);
  
      displayStory(data, idx);
      form.lastIdx = idx;
    });
  });
  