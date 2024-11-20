function convertString(str) {
  return str
  .split(/[\s-]/) // Tách chuỗi thành mảng các từ
  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu của mỗi từ
  .join(' '); // Ghép mảng các từ thành chuỗi
}

function toSlug(str) {
  return str
        .toLowerCase() // Chuyển chuỗi về chữ thường
        .trim() // Loại bỏ khoảng trắng đầu và cuối chuỗi
        .replace(/[\s_]+/g, '-') // Thay khoảng trắng hoặc dấu gạch dưới bằng dấu gạch ngang
        .replace(/[^a-z0-9-]/g, '') // Loại bỏ các ký tự không phải chữ cái, số hoặc dấu gạch ngang
        .replace(/-+/g, '-'); // Loại bỏ dấu gạch ngang dư thừa (nhiều dấu liên tiếp thành 1)
}


module.exports = {
  convertString,
  toSlug
};
