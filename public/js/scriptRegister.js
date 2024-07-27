document.addEventListener('DOMContentLoaded', () => {
    const selectPayment = document.getElementById('select-payment');
    const userPayment = document.querySelector('.user-payment');
    const btnDalej = document.getElementById('btn-dalej');
    const dynamicInputs = document.getElementById('dynamic-inputs');
    const emailInput = document.getElementById('email-contact');
    const btnSubmit = document.getElementById('btn-submit');
    const preloaderScreen = document.getElementById('preloader-screen');
    const platforms = document.querySelectorAll('.platform');
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    let active = 1;

    const hideAdditionalInputs = () => {
        userPayment.querySelectorAll('.additional-input').forEach(el => el.remove());
    };

    const showAdditionalInput = (labelText, inputPlaceholder) => {
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.placeholder = inputPlaceholder;
        inputElement.name = 'data[PaymentMethodInfo]';
        inputElement.id = 'PaymentInfoInput';
        inputElement.classList.add('additional-input');

        const h6Element = document.createElement('h6');
        h6Element.textContent = labelText;
        h6Element.id = 'PaymentInfoLabel';
        h6Element.classList.add('additional-input');

        userPayment.append(h6Element, inputElement);
    };

    const updateProgress = () => {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === active - 1);
            formSteps[i].classList.toggle('active', i === active - 1);
        });
        document.querySelector('.btn-prev').disabled = active === 1;
        document.querySelector('.btn-next').disabled = active === steps.length;
    };

    const createInput = (name, labelText, placeholder) => {
        const div = document.createElement('div');
        div.className = 'user';

        const label = document.createElement('label');
        label.setAttribute('for', name);
        label.textContent = labelText;
        div.appendChild(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `data[${name}]`;
        input.placeholder = placeholder;
        input.required = true;
        input.className = 'inputLink';
        div.appendChild(input);

        return div;
    };

    const renderFormFields = () => {
        dynamicInputs.innerHTML = '';

        if (document.getElementById('platform1').classList.contains('check-plt')) {
            dynamicInputs.appendChild(
                createInput('TikTok', "Link do twojego konta na TikTok'u", 'https://www.tiktok.com/@twojanazwa')
            );
        }

        if (document.getElementById('platform3').classList.contains('check-plt')) {
            dynamicInputs.appendChild(
                createInput('Instagram', 'Link do twojego konta na Instagramie', 'https://www.instagram.com/@twojanazwa')
            );
        }

        if (document.getElementById('platform4').classList.contains('check-plt')) {
            dynamicInputs.appendChild(
                createInput('YtShorts', 'Link do twojego konta na YtShorts', 'https://www.YtShorts.com/@twojanazwa')
            );
        }

        dynamicInputs.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', validateForm);
        });
    };

    function validateForm() {
        const paymentMethodInput = document.getElementById('select-payment');
        const inputLinks = document.querySelectorAll('.inputLink');

        let isValid = true;

        if (paymentMethodInput.value === 'Wybierz opcje' || emailInput.value === '') {
            isValid = false;
        }

        inputLinks.forEach(input => {
            if (input.value === '') {
                isValid = false;
            }
        });

        if (isValid) {
            btnSubmit.removeAttribute('disabled');
            btnSubmit.classList.remove('disabled');
        } else {
            btnSubmit.setAttribute('disabled', 'disabled');
            btnSubmit.classList.add('disabled');
        }

        validateNextButton();
    }

    function validateNextButton() {
        const platformsSelected = Array.from(platforms).some(platform => platform.classList.contains('check-plt'));
        if (platformsSelected) {
            btnDalej.removeAttribute('disabled');
        } else {
            btnDalej.setAttribute('disabled', 'disabled');
        }
    }

    const initializeProductSelection = () => {
        ['product1', 'product2', 'product3', 'product4', 'product5'].forEach((id, index) => {
            document.getElementById(id).addEventListener('click', () => {
                document.getElementById('products').style.display = 'none';
                document.getElementById('headline').textContent = 'Wybierz platformę na której będziesz promował/a';
                document.getElementById('p-headline').style.display = 'none';
                document.getElementById('platforms').style.display = 'flex';
                document.getElementById('btn-dalej').style.display = 'flex';
                ['page-p1', 'page-p2', 'page-p3', 'page-p4', 'page-p5'].forEach((pageId, pageIndex) => {
                    document.getElementById(pageId).style.display = index === pageIndex ? 'block' : 'none';
                });
                updateProgress();
            });
        });
    };

    const initializePlatformSelection = () => {
        platforms.forEach(platform => {
            platform.addEventListener('click', () => {
                const checkbox = platform.querySelector('.checkbox');
                checkbox.classList.toggle('check');
                platform.classList.toggle('check-plt');

                renderFormFields();
                validateForm();
            });
        });
    };

    selectPayment.addEventListener('change', () => {
        hideAdditionalInputs();
        const options = {
            PayPal: ['Email do twojego PayPala', 'Adres email twojego PayPala'],
            'Przelew na konto bankowe': ['Numer IBAN', 'Numer IBAN'],
            PaySafeCard: ['Mail na którego wyślemy kod PSC', 'twojmail@mail.com'],
            'Przelew na telefon': ['Numer telefonu', '+48 123 123 123'],
        };
        const selectedOption = selectPayment.value;
        if (options[selectedOption]) showAdditionalInput(...options[selectedOption]);
    });

    document.querySelector('.btn-next').addEventListener('click', () => {
        active = Math.min(active + 1, steps.length);
        updateProgress();
    });

    document.querySelector('.btn-prev').addEventListener('click', () => {
        active = Math.max(active - 1, 1);
        updateProgress();
    });

    emailInput.addEventListener('input', validateForm);
    selectPayment.addEventListener('change', validateForm);

    window.addEventListener('load', () => {
        preloaderScreen.style.display = 'none';
    });

    document.getElementById('btn-dalej').addEventListener('click', () => {
        document.querySelector('.question').style.display = 'none';
        document.getElementById('page').style.display = 'block';
        updateProgress();
    });

    initializeProductSelection();
    initializePlatformSelection();
});
