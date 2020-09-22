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
/***/ (function(module, exports) {

function inputs() {
    const data = document.querySelectorAll('.modalWindow__inputs .modalWindow__input');


    let dataObj = {};
    data.forEach(item => {
        item.addEventListener('input', (e) => {
            for (let i = 0; i < data.length; i++) {
                switch (data[i].name) {
                    case 'name':
                        if (!!data[i].value.match(/([A-Z])\w+/g)) {
                            dataObj[data[i].name] = data[i].value;
                            data[i].style.border = '1px solid black';
                        } else {
                            data[i].style.border = '2px solid red';
                            showMistake('Введите с большой буквы! Только буквы!', data[i]);
                        }
                        break;
                    case 'surname':
                        dataObj[data[i].name] = data[i].value;
                        break;
                    case 'number':
                        break;
                    case 'email':
                        break;
                    default:
                        data[i].style.border = '2px solid red';
                }
            }
        });
    });

    function showMistake(text,parent) {
        if (parent.previousElementSibling) {
            console.log('done')
            if (parent.previousElementSibling.value == text) {
                return;
            } 
        }

        let newBlock = document.createElement('div');
            newBlock.style.cssText = `
            display: block;
            width: 100%;
            height: 30px;
            text-align: center;
            `;
            parent.style.margin = 0;
            newBlock.textContent = text;
            parent.before(newBlock);
    }
}
// Остался вопрос как реализовать удаление ошибочного блока
// сделать все проверки и сформировать файл json
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
/***/ (function(module, exports) {

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
        function showRegWindow() {
            pos += 1;
            view += 2;
            modalWindowWindow.style.top = pos + '%';
            modalWindowWindow.style.opacity = view + '%';
            if (pos < 50) {
                requestAnimationFrame(showRegWindow);
            }
        }
    }

    function closeModal() {
        document.addEventListener('keydown', (e) => {

            if (e.code === 'Escape') {
                modalWindow.style.display = 'none';
                body.style.overflow = 'scroll';
            }
        });

        modalWindowClose.addEventListener('click', (e) => {
            modalWindow.style.display = 'none';
        });

        modalWindow.addEventListener('click', (e) => {

            if (e.target === modalWindow) {
                modalWindow.style.display = 'none';
            }
        });
    }

    closeModal();
}

module.exports = modaleWindow;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map