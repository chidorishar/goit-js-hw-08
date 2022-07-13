const throttle = require('lodash.throttle');

const FORM_DATA_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
let formData = {};

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

(() => {
  formData = JSON.parse(localStorage.getItem(FORM_DATA_KEY));
  if (formData) {
    Object.keys(formData).forEach(key =>
      formData[key] ? (formEl.elements[key].value = formData[key]) : null
    );
  } else {
    formData = {};
  }
})();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  [...formEl.elements].forEach(el => (el.value = ''));
  localStorage.removeItem(FORM_DATA_KEY);
  console.log(formData);
}
