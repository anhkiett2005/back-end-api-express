function convertString(str) {
  return str
  .split(/[\s-]/) // Tách chuỗi thành mảng các từ
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu của mỗi từ
  .join(' '); // Ghép mảng các từ thành chuỗi
}


module.exports = convertString;
