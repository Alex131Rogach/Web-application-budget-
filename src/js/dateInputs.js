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