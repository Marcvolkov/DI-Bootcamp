// Exercise 3: Repeat The Question

let num;
do {
  // prompt возвращает строку
  const answer = prompt("Введите число (должно быть ≥ 10):");
  console.log("Тип данных от prompt:", typeof answer); // всегда "string"
  
  // приводим к числу
  num = Number(answer);
  
  // опционально: можно предупредить, если ввели не число
  if (isNaN(num)) {
    alert("Это не похоже на число, попробуйте снова.");
  }
} while (num < 10 || isNaN(num));

alert(`Спасибо! Вы ввели число ${num}.`);
console.log("Итоговое число:", num);
