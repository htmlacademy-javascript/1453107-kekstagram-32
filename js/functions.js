// ----- 2.31. Нужно больше функций -----

const checkStringLength = (str, maxLength) => str.length <= maxLength;

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false


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

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


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

getNumberFromString('2023 год'); // 2023
getNumberFromString('ECMAScript 2022'); // 2022
getNumberFromString('1 кефир, 0.5 батона'); // 105
getNumberFromString('агент 007'); // 7
getNumberFromString('а я томат'); // NaN
getNumberFromString(2023); // 2023
getNumberFromString(-1); // 1
getNumberFromString(1.5); // 15


// ----- 5.16. Функции возвращаются -----

const getTimeInMinutes = (strTime) => {
  let [hours, minutes] = strTime.split(':');

  hours = Number(hours);
  minutes = Number(minutes);

  return hours * 60 + minutes;
};

const checkIfMeetingPossible = (workTimeStart, workTimeEnd, meetingTimeStart, meetingDuration) => {
  workTimeStart = getTimeInMinutes(workTimeStart);
  workTimeEnd = getTimeInMinutes(workTimeEnd);
  meetingTimeStart = getTimeInMinutes(meetingTimeStart);

  if (workTimeStart <= meetingTimeStart && workTimeEnd >= meetingTimeStart + meetingDuration) {
    return true;
  }

  return false;
};

console.log(checkIfMeetingPossible('08:00', '17:30', '14:00', 90)); // true
console.log(checkIfMeetingPossible('8:0', '10:0', '8:0', 120));     // true
console.log(checkIfMeetingPossible('08:00', '14:30', '14:00', 90)); // false
console.log(checkIfMeetingPossible('14:00', '17:30', '08:0', 90));  // false
console.log(checkIfMeetingPossible('8:00', '17:30', '08:00', 900)); // false
