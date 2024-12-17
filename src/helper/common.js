const Common = {
    formatDate(date) {
        if (!date) {
            return { result: "", resultForForm: null };
        }
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        let result = `${day}/${month}/${year}`;
        let resultForForm = `${year}-${month}-${day}`;
        return { result, resultForForm };
    },

    convertToUTC(localDate) {
        const year = localDate.getFullYear();
        const month = localDate.getMonth();
        const day = localDate.getDate();
        const hours = localDate.getHours();
        const minutes = localDate.getMinutes();
        const seconds = localDate.getSeconds();
      
        const utcTimestamp = Date.UTC(year, month, day, hours, minutes, seconds);
        const utcDate = new Date(utcTimestamp);
      
        return utcDate;
    },

    formatNumberWithDots(number) {
        const numString = number.toString();
      
        // Tách phần nguyên và phần thập phân
        const parts = numString.split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1] || '';
      
        // Thêm dấu chấm vào phần nguyên
        let formattedIntegerPart = '';
        let counter = 0;
        for (let i = integerPart.length - 1; i >= 0; i--) {
          counter++;
          formattedIntegerPart = integerPart[i] + formattedIntegerPart;
          if (counter % 3 === 0 && i !== 0) {
            formattedIntegerPart = '.' + formattedIntegerPart;
          }
        }
      
        // Kết hợp lại phần nguyên và phần thập phân
        return formattedIntegerPart + (decimalPart ? '.' + decimalPart : '');
    }
}

export default Common;