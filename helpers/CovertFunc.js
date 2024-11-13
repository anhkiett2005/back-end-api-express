function convertString(str) {
    const regex = /[-_]/;
      // tìm và xóa toàn bộ khoảng trắng
      let words = str.replace(/\s+/g, '');

      // Thay thế tất cả các dấu gạch ngang, dấu gạch dưới bằng khoảng trắng

      if(regex.test(str)) {
        words = words.replace(/[-_]/g, ' ');
        
        // Viết hoa chữ cái đầu của mỗi từ
        return words.replace(/\b\w/g, char => char.toUpperCase());
      }else {
        const newWord =  words.replace(/(\w+?)(\d+)/, function(_, letters, numbers) {
          return letters.charAt(0).toUpperCase() + letters.slice(1) + ' ' + numbers;
      });


        return newWord;
      }
  }


module.exports = convertString;
