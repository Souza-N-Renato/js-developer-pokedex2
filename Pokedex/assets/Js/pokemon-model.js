// Pokemon class
class Pokemon {
    number;// Pokemon number
    name;// Pokemon name
    type;// Pokemon main type
    types = [];// Pokemon types
    photo;// Pokemon Photo
    habilities = [];// Pokemon abilities
    moves = [];// Pokemon moves
    movesPower = [];// Pokemon moves power
    totalPower;// Pokemon total power
    weight;// Pokemon weight
    groups = [];// Pokemon Groups
    specie = [];// Pokemon Specie
    habitat;// Pokemon Habitat
    color;// Pokemon color
    gender;// Pokemon gender 
    movesType;// move types
    evolution = [];// evolutiom chain
    

}

const formatOrder = (order) => {
    if (order < 10) return `#00${order}`;
    if (order < 100) return `#0${order}`;
    return `#${order}`;
  }
  
  const convertTypesToOl = (types = []) => {
    return types.map((type) => `<li class="type ${type}">${type}</li>`).join('');
  };

  
