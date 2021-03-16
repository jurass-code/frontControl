document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const regName = /^[А-ЯЁа-яё -]+$/;
    const regPhone = /^[+]?[0-9 -]+$/;
    const regMail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let nameValid = false,
        phoneValid = false,
        mailValid = false,
        emptyValid = false;

    const submit = () => {
        let formData = new FormData(form);
        let request = new XMLHttpRequest();
        request.open("POST", "https://60376bfd5435040017722533.mockapi.io/form");
        request.send(formData);
        request.onload = () => {
            if (request.status == 201)
                alert(JSON.parse(request.response).text)
            else {
                alert('Ошибка: ' + request.status + '\n' + request.statusText + '\n' + request.responseText);
            }
            form.reset();
        };

    }

    const validateElem = (elem) => {
        if (elem.name === 'name') {
            if (!regName.test(elem.value) && elem.value != '') {
                elem.style.border = '1px solid red';
                nameValid = false;
            } else {
                elem.style.border = '';
                nameValid = true;
            }
        }
        if (elem.name === 'phone') {
            if (!regPhone.test(elem.value) && elem.value != '') {
                elem.style.border = '1px solid red';
                phoneValid = false;
            } else {
                elem.style.border = '';
                phoneValid = true;
            }
        }
        if (elem.name === 'email') {
            if (!regMail.test(elem.value) && elem.value != '') {
                elem.style.border = '1px solid red';
                mailValid = false;
            } else {
                elem.style.border = '';
                mailValid = true;
            }
        }
    };

    for (let elem of form.elements) {
        if (elem.classList.contains('form__input') && !elem.classList.contains('form__input_btn')) {
            elem.addEventListener('blur', () => {
                validateElem(elem)
            });
        }

    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        for (let elem of form.elements) {
            if (elem.classList.contains('form__input') && !elem.classList.contains('form__input_btn'))
                if (elem.value === '') {
                    elem.style.border = '1px solid red';
                    emptyValid = false;
                } else {
                    emptyValid = true;
                }
        }
        if (nameValid && phoneValid && mailValid && emptyValid) {
            submit();
        } else {
            alert('Введите данные корректно')
        }
    });
});