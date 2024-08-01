// ----- 2.31. Нужно больше функций -----

const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false


const isPalindrome = (string) => {
  const clearedString = string.toLowerCase().replaceAll(' ', '');
  const stringLength = clearedString.length;
  const middle = Math.floor(stringLength / 2);

  for(let i = 1; i <= middle; i++) {
    if (clearedString.at(i - 1) !== clearedString.at(stringLength - i)) {
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
  const clearedString = String(string).replaceAll(' ', '');
  const stringLength = clearedString.length;
  const numbers = [];

  for (let i = 0; i < stringLength; i++) {
    if (!Number.isNaN(Number(clearedString.at(i)))) {
      numbers.push(clearedString.at(i));
    }
  }

  return numbers.length === 0 ? NaN : Number(numbers.join(''));
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

const getTimeInMinutes = (timeString) => {
  let [hours, minutes] = timeString.split(':');

  hours = Number(hours);
  minutes = Number(minutes);

  return hours * 60 + minutes;
};

const checkIfMeetingPossible = (workTimeStart, workTimeEnd, meetingTimeStart, meetingDuration) => {
  workTimeStart = getTimeInMinutes(workTimeStart);
  workTimeEnd = getTimeInMinutes(workTimeEnd);
  meetingTimeStart = getTimeInMinutes(meetingTimeStart);

  return workTimeStart <= meetingTimeStart && workTimeEnd >= meetingTimeStart + meetingDuration;
};

checkIfMeetingPossible('08:00', '17:30', '14:00', 90); // true
checkIfMeetingPossible('8:0', '10:0', '8:0', 120); // true
checkIfMeetingPossible('08:00', '14:30', '14:00', 90); // false
checkIfMeetingPossible('14:00', '17:30', '08:0', 90); // false
checkIfMeetingPossible('8:00', '17:30', '08:00', 900); // false
