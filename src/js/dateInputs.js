"use strict";

function inputs() {
    const data = document.querySelectorAll('.modalWindow__inputs .modalWindow__input'),
          number = document.querySelector('#number'),
          mistake = document.querySelector('.mistakeMessage'),
          checkBox = document.querySelector('.modalWindow__checkbox');
    let   dataObj = {}, container = '';

        number.value = '+380';
        
    data.forEach(item => {
        item.addEventListener('input', (e) => {
            let tar = e.target;
                
            switch (tar.name) {
                case 'name':
                    checkSize(14, e.target);
                    if (tar.value.match(/([A-Z])\w+\D+/g)) {
                        checkInput(tar);
                    } else {
                        fail(tar); 
                    }
                    break;
                case 'surname':
                    checkSize(14, e.target);
                    if (tar.value.match(/([A-Z])\w+\D+/g)) {
                        checkInput(tar);
                    } else {
                        fail(tar); 
                    }
                    break;
                case 'number':
                    phone(tar.value, tar);
                    break;
                case 'email':
                    checkSize(25, e.target);
                    break;
                default:
                    fail(tar);
            }
            
            if (tar.value == '') {
                success(tar);
            }
        });
    });
    
    function phone(number, input) {

        if (input.value.length >= 14) {
            input.value = number.slice(0,number.length - 1);
            return;
        }

        if (input.value.length < 4) {
            input.value = '+380';
            return number;
        }

        for (let key of number) {
            if (key * 0 === 0) {
                success(input);
            } else {
                fail(input);
            }
        }

        return phone;
    }

    function checkSize(size, input) {

        if (input.value.length > `+${size}`) {
            input.value = input.value.slice(0,input.value.length - 1);
        }
    }

    function checkInput(input) {

        if (input.value.match(/([A-Z])\w+\D+/g)) {
            dataObj[input.name] = input.value.match(/([A-Z])\w+\D+/g).join('');
            success(input);
        }
    }

    function success(input) {
        input.style.border = '1px solid black';
        mistake.style.display = 'none';
        checkBox.style.margin = '10px 0 0 0';
    }

    function fail(input) {
        input.style.border = '2px solid red';
        mistake.style.display = 'block';
        checkBox.style.margin = '0 0 0 0';
    }

}

// Сделат чек боксы
// записать все данные 
// сделать все проверки и сформировать файл json
module.exports = inputs;