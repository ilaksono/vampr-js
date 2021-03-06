class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberVamps = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberVamps++;
    }
    return numberVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name)
      return this;
    for (const offs of this.offspring)
      if (offs.vampireWithName(name) !== null)
        return offs.vampireWithName(name);
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0;
    for (const descendant of this.offspring)
      total += descendant.totalDescendents + 1;
    return total;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let vamps = [];
    if(this.yearConverted > 1980)
      vamps.push(this);
    for(let descendant of this.offspring)
      vamps = vamps.concat(descendant.allMillennialVampires);

    return vamps;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVamp = this;
    do {
      let candidateAncestor = vampire;
      do {
        if (candidateAncestor === currentVamp)
          return candidateAncestor;
        candidateAncestor = candidateAncestor.creator;
      } while (candidateAncestor);
      currentVamp = currentVamp.creator;
    } while (currentVamp.creator);
    return currentVamp;
  }

}

module.exports = Vampire;

