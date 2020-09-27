"use strict";

function inputs() {
    const data = document.querySelectorAll('.modalWindow__inputs .modalWindow__input'),
          number = document.querySelector('#number'),
          mistake = document.querySelector('.modalWindow__mistakeMessage'),
          wrapperBoxes =  document.querySelector('.modalWindow__checkbox'),
          sex = document.querySelectorAll('.modalWindow__checkbox input'),
          sendingButton = document.querySelector('.modalWindow__button');

    number.value = '+380';

// looking to localeStorage sex 
    sex.forEach(item => {

        if (localStorage.sex === item.value) {
            item.checked = true;
        }
    });

// writing data from localStorage 

    for (let i = 0; i < data.length; i++) {
        for (let key of Object.keys(localStorage)) {
            if (data[i].name === key) {
                data[i].value = localStorage.getItem(data[i].name);
                break;
            } else {
                if (!localStorage[data[i].name]) {
                    localStorage[data[i].name] = '';
            }
            }
        }
    }

// Writing data while they are changing 
    data.forEach(item => {
        item.addEventListener('input', (e) => {
            let tar = e.target;

            switch (tar.name) {
                case 'name':
                    localStorage[tar.name] = checkInput(tar);
                    break;
                case 'surname':
                    localStorage[tar.name] = checkInput(tar);
                    break;
                case 'number':
                    if (number.value.length <= 4) {
                        number.value = '+380';
                    }
                    localStorage[tar.name] = phone(tar.value, tar);
                    break;
                case 'email':
                    checkSize(25, e.target);
                    localStorage[tar.name] = tar.value;
                    break;
            }
            
            if (tar.value == '') {
                success(tar);
            }

        });
    });

// writing sex in localStorage 

    sex.forEach(item => {
        item.addEventListener('click', (e) => {
            localStorage.sex = e.target.value;
        });
    });
// Checking sex
    if (!localStorage.sex) {
        localStorage.sex = 'man';
        sex[0].checked = true;
    }

// Sending data 
    sendingButton.addEventListener('click', () => {

        data.forEach(item => {

            if (item.value == '' || item.name == 'number' && item.value == '+380') {
                checkField(item.name, fail, 'field is void!'); 
                return; 
            } else {

                if (localStorage.number.length == 14) {
                    checkField('number', success);
                } else { checkField('number', fail, 'number is short'); return;}

                if (localStorage.email.length >= 8) {
                    checkField('email', success);
                }  else { checkField('email', fail, 'Field must be longer'); return;} 
            }

            if (localStorage.name == '') {
                checkField('name', fail, 'field is void');
                return;
            } else if (localStorage.surname == '') {
                checkField('surname', fail, 'field is void');
                return;
            }
                
            sendingData(localStorage);
        });
    });


// Preparing data to server

    function sendingData(obj) {
        fetch('server.php', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
        }).then(d => {
        console.log(d);
        });
    }


    function checkField(nameField, status, message = 'Data field is incorrect') {
        data.forEach(item => {

            if (item.getAttribute('name') === nameField) {
               status(item, message);
            }
        });
    }

    function phone(number, input) {

        checkSize(13, input);

        if (isNaN(input.value) || !!input.value.match(/\s/g)) {
            checkField('number', fail, 'field has letter or space');
            return '+380';
        } 

        success(input);
        return number; 
    }

    function checkSize(size, input) {

        if (input.value.length > `+${size}`) {
            input.value = input.value.slice(0,input.value.length - 1);
        }
    }

    function checkInput(input) {
        checkSize(14, input);

        if (!!input.value.match(/\s/g) || input.value == '') {
            checkField(input.name, fail, 'field has space');
            return input.value;
        }

        if (!!input.value[0].match(/([A-Z])/)) {

            if (input.value.length > 1) {
                success(input);

                for (let i = 0; i < input.value.length; i++) {

                    if (+input.value[i] * 0 == 0) {
                        fail(input);
                        return '';
                    } else {
                        success(input);
                    }
                }
            } else { 
                checkField(input.name, fail, `${input.name} must be longer`); 
                return '';
            }

            return input.value;
        }
        
        checkField(input.name, fail, 'the first letter must be big');
        return input.value;
    }

    function success(input) {
        input.style.border = '1px solid black';
        mistake.style.height = '0';
        mistake.textContent = '';
        wrapperBoxes.style.margin = '10px 0 0 0';
    }

    function fail(input, message = 'Data field is incorrect') {
        input.style.border = '2px solid red';
        mistake.textContent = message;
        mistake.style.height = '30px';
        wrapperBoxes.style.margin = '0 0 0 0';
    }


}

module.exports = inputs;