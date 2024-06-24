

const checkStringLength = (str, maxLength) => str.length <= maxLength;

console.group();
// Строка короче 20 символов
console.log(checkStringLength('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkStringLength('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkStringLength('проверяемая строка', 10)); // false
console.groupEnd();


const isPalindrome = (string) => {
  const str = string.toLowerCase().replaceAll(' ', '');
  const strLength = str.length;
  const middle = Math.floor(strLength / 2);

  for(let i = 1; i <= middle; i++) {
    if (str.at(i - 1) !== str.at(strLength - i)) {
      return false;
    }
  }

  return true;
};

console.group();
// Строка является палиндромом
console.log(isPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('ДовОд')); // true
// Это не палиндром
console.log(isPalindrome('Кекс')); // false
// Это палиндром
console.log(isPalindrome('Лёша на полке клопа нашёл ')); // true
console.groupEnd();


const getNumberFromString = (string) => {
  const str = String(string).replaceAll(' ', '');
  const length = str.length;
  const arr = [];

  for (let i = 0; i < length; i++) {
    if (!Number.isNaN(Number(str.at(i)))) {
      arr.push(str.at(i));
    }
  }

  return arr.length === 0 ? NaN : Number(arr.join(''));
};

console.group();
console.log(getNumberFromString('2023 год')); // 2023
console.log(getNumberFromString('ECMAScript 2022')); // 2022
console.log(getNumberFromString('1 кефир, 0.5 батона')); // 105
console.log(getNumberFromString('агент 007')); // 7
console.log(getNumberFromString('а я томат')); // NaN
console.log(getNumberFromString(2023)); // 2023
console.log(getNumberFromString(-1)); // 1
console.log(getNumberFromString(1.5)); // 15
console.groupEnd();
