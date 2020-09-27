/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/dateInputs.js":
/*!******************************!*\
  !*** ./src/js/dateInputs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener('DOMContentLoaded', () => {

    const modalWindow = __webpack_require__(/*! ./window */ "./src/js/window.js");
    const inputs = __webpack_require__(/*! ./dateInputs */ "./src/js/dateInputs.js");

    modalWindow();
    inputs();
});


/***/ }),

/***/ "./src/js/window.js":
/*!**************************!*\
  !*** ./src/js/window.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function modaleWindow() {
    const buttonsHeader = document.querySelectorAll('.header__items button'),
          modalWindow = document.querySelector('.modalWindow'),
          modalWindowClose = modalWindow.querySelector('.modalWindow__close'),
          modalWindowWindow = modalWindow.querySelector('.modalWindow__window'),
          body = document.querySelector('body');

    buttonsHeader.forEach(item => {
        item.addEventListener('click', (e) => {

            if (item.classList.contains('enter')) {
                console.log('enter');
            } else {
                showWindow();
            }
        });
    });

    function showWindow() {
        let pos = 0, view = 0;
            body.style.overflow = 'hidden';
            modalWindow.style.display = 'flex';
            showRegWindow();
            buttonsHeader.forEach(item => {
                item.disabled = 'disabled';
            });
        function showRegWindow() {
            pos += 1;
            view += 2;
            modalWindowWindow.style.top = pos + '%';
            modalWindowWindow.style.opacity = view + '%';
            if (pos < 50) {
                requestAnimationFrame(showRegWindow);
            }
        }
        closeModal();
    }

    function closeModal() {

        modalWindowClose.addEventListener('click', (e) => {
                functional();
        });

        modalWindow.addEventListener('click', (e) => {

            if (e.target === modalWindow) {
                functional();
            }
        });

        function functional() {
            modalWindow.style.display = 'none';
            body.style.overflow = 'scroll';
            buttonsHeader.forEach(item => {
                item.disabled = '';
            });
        }
    }
}

module.exports = modaleWindow;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map