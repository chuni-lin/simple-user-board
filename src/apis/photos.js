/**
* @param  {Number} num query param
* @return {String} photo URL
* @public
*/
const getRandomPhoto = (num) => {
  return `https://picsum.photos/350/100?random=${num}`
}

export default getRandomPhoto
