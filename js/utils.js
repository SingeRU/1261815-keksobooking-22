const getRandomNumber = function (from, to, signsQuantity) {
  if(from > to || from == to) {
    throw new Error('Значение "от" не может быть больше или равнятся значению "до"!');
  }
    
  if (from < 0 || to < 0 ) {
    throw new Error('Значения не могут быть меньше нуля!');
  }
    
  let rand = from + Math.random() * (to - from);
  return rand.toFixed(signsQuantity);
    
}

const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
}

export {getRandomArrayElement, getRandomNumber};
