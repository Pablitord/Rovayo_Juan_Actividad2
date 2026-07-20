const form = document.getElementById('patientForm');
const steps = [...document.querySelectorAll('.form-step')];
const indicators = [...document.querySelectorAll('[data-step-indicator]')];
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('backButton');
const submitButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetButton');
const progressFill = document.getElementById('progressFill');
const progressValue = document.getElementById('progressValue');
const birthDate = document.getElementById('birthDate');
const ageInput = document.getElementById('age');
const representativeFields = document.getElementById('representativeFields');
const adultNotice = document.getElementById('adultNotice');
const insuranceFields = document.getElementById('insuranceFields');
const formAlert = document.getElementById('formAlert');
const confirmationDialog = document.getElementById('confirmationDialog');
const successDialog = document.getElementById('successDialog');
const newPatientButton = document.getElementById('newPatientButton');
const symptoms = document.getElementById('symptoms');
const symptomsCount = document.getElementById('symptomsCount');
const STORAGE_KEY = 'clinicaSanJosePatientDraft';
let currentStep = 1;

const fieldMessages = {
  fullName: 'Ingrese el nombre completo del paciente.',
  birthDate: 'Seleccione una fecha de nacimiento válida.',
  gender: 'Seleccione una opción de género.',
  bloodType: 'Seleccione el tipo de sangre o “Desconocido”.',
  email: 'Ingrese un correo válido, por ejemplo: nombre@correo.com.',
  phone: 'Ingrese exactamente 10 dígitos numéricos.',
  address: 'Ingrese una dirección de al menos 8 caracteres.',
  country: 'Seleccione el país de origen.',
  insurer: 'Ingrese el nombre de la aseguradora.',
  policyNumber: 'Ingrese el número de póliza.',
  representativeName: 'Ingrese el nombre del representante legal.',
  representativePhone: 'Ingrese exactamente 10 dígitos numéricos.',
  symptoms: 'Describa el motivo de consulta con al menos 10 caracteres.'
};

function generatePatientId() {
  const existing = localStorage.getItem('clinicaPatientId');
  if (existing) return existing;
  const id = `PAC-${Math.floor(1000 + Math.random() * 9000)}`;
  localStorage.setItem('clinicaPatientId', id);
  return id;
}

document.getElementById('patientIdDisplay').textContent = generatePatientId();

function setAutomaticEntryDateTime() {
  const now = new Date();
  document.getElementById('entryDate').value = now.toISOString().split('T')[0];
  document.getElementById('entryTime').value = now.toTimeString().slice(0, 5);
}

function calculateAge(value) {
  if (!value) return null;
  const today = new Date();
  const born = new Date(`${value}T00:00:00`);
  if (Number.isNaN(born.getTime()) || born > today) return null;
  let age = today.getFullYear() - born.getFullYear();
  const monthDifference = today.getMonth() - born.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < born.getDate())) age--;
  return age;
}

function updateRepresentativeVisibility() {
  const age = calculateAge(birthDate.value);
  ageInput.value = age ?? '';
  const isMinor = age !== null && age < 18;
  representativeFields.hidden = !isMinor;
  adultNotice.hidden = isMinor;
  ['representativeName', 'representativePhone'].forEach((id) => {
    const field = document.getElementById(id);
    field.required = isMinor;
    if (!isMinor) clearFieldState(field);
  });
}

function updateInsuranceVisibility() {
  const selected = form.querySelector('input[name="hasInsurance"]:checked')?.value;
  const hasInsurance = selected === 'yes';
  insuranceFields.hidden = !hasInsurance;
  ['insurer', 'policyNumber'].forEach((id) => {
    const field = document.getElementById(id);
    field.required = hasInsurance;
    if (!hasInsurance) clearFieldState(field);
  });
  document.getElementById('hasInsuranceError').textContent = selected ? '' : '';
}

function clearFieldState(field) {
  field.classList.remove('invalid', 'valid');
  const error = document.getElementById(`${field.id}Error`);
  if (error) error.textContent = '';
}

function validateField(field, showSuccess = true) {
  if (!field || field.disabled || field.closest('[hidden]')) return true;
  let valid = true;
  const value = field.value.trim();

  if (field.required && !value) valid = false;
  if (valid && field.type === 'email' && value) valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (valid && (field.id === 'phone' || field.id === 'representativePhone') && value) valid = /^\d{10}$/.test(value);
  if (valid && field.minLength > 0 && value) valid = value.length >= field.minLength;
  if (valid && field.id === 'birthDate' && value) valid = calculateAge(value) !== null;

  const error = document.getElementById(`${field.id}Error`);
  field.classList.toggle('invalid', !valid);
  field.classList.toggle('valid', valid && value && showSuccess);
  if (error) error.textContent = valid ? '' : (fieldMessages[field.id] || 'Revise este campo.');
  return valid;
}

function validateInsuranceChoice() {
  const selected = form.querySelector('input[name="hasInsurance"]:checked');
  const error = document.getElementById('hasInsuranceError');
  if (!selected) {
    error.textContent = 'Seleccione si el paciente tiene seguro médico.';
    return false;
  }
  error.textContent = '';
  return true;
}

function fieldsForStep(step) {
  return [...document.querySelector(`[data-step="${step}"]`).querySelectorAll('input, select, textarea')]
    .filter((field) => field.type !== 'radio' && !field.closest('[hidden]'));
}

function validateStep(step) {
  let valid = true;
  fieldsForStep(step).forEach((field) => {
    if (!validateField(field)) valid = false;
  });
  if (step === 3 && !validateInsuranceChoice()) valid = false;

  formAlert.hidden = valid;
  if (!valid) {
    formAlert.textContent = 'Revise los campos marcados antes de continuar.';
    const firstInvalid = document.querySelector(`[data-step="${step}"] .invalid`) || document.getElementById('hasInsuranceError');
    firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (firstInvalid?.focus) firstInvalid.focus();
  }
  return valid;
}

function showStep(step) {
  currentStep = step;
  steps.forEach((section) => {
    const active = Number(section.dataset.step) === step;
    section.hidden = !active;
    section.classList.toggle('active', active);
  });
  indicators.forEach((indicator) => {
    const number = Number(indicator.dataset.stepIndicator);
    indicator.classList.toggle('active', number === step);
    indicator.classList.toggle('completed', number < step);
  });
  const progress = step * 25;
  progressFill.style.width = `${progress}%`;
  progressValue.textContent = progress;
  backButton.hidden = step === 1;
  nextButton.hidden = step === 4;
  submitButton.hidden = step !== 4;
  formAlert.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  saveDraft();
}

function collectDraft() {
  const data = {};
  new FormData(form).forEach((value, key) => { data[key] = value; });
  data.currentStep = currentStep;
  return data;
}

function saveDraft() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(collectDraft()));
}

function loadDraft() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'currentStep') return;
      const fields = form.querySelectorAll(`[name="${CSS.escape(key)}"]`);
      fields.forEach((field) => {
        if (field.type === 'radio') field.checked = field.value === value;
        else field.value = value;
      });
    });
    updateRepresentativeVisibility();
    updateInsuranceVisibility();
    symptomsCount.textContent = symptoms.value.length;
    showStep(Number(data.currentStep) || 1);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function clearForm() {
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem('clinicaPatientId');
  document.getElementById('patientIdDisplay').textContent = generatePatientId();
  [...form.querySelectorAll('.invalid, .valid')].forEach((field) => field.classList.remove('invalid', 'valid'));
  [...form.querySelectorAll('.field-error')].forEach((error) => error.textContent = '');
  symptomsCount.textContent = '0';
  setAutomaticEntryDateTime();
  updateRepresentativeVisibility();
  updateInsuranceVisibility();
  showStep(1);
}

nextButton.addEventListener('click', () => {
  if (validateStep(currentStep)) showStep(currentStep + 1);
});

backButton.addEventListener('click', () => showStep(currentStep - 1));

birthDate.addEventListener('change', () => {
  updateRepresentativeVisibility();
  validateField(birthDate);
  saveDraft();
});

form.querySelectorAll('input[name="hasInsurance"]').forEach((radio) => {
  radio.addEventListener('change', () => {
    updateInsuranceVisibility();
    validateInsuranceChoice();
    saveDraft();
  });
});

form.querySelectorAll('input, select, textarea').forEach((field) => {
  const eventName = field.tagName === 'SELECT' || field.type === 'date' || field.type === 'radio' ? 'change' : 'input';
  field.addEventListener(eventName, () => {
    if (field.type !== 'radio' && field.id !== 'age' && !field.readOnly) validateField(field);
    if (field === symptoms) symptomsCount.textContent = field.value.length;
    saveDraft();
  });
});

resetButton.addEventListener('click', () => confirmationDialog.showModal());
confirmationDialog.addEventListener('close', () => {
  if (confirmationDialog.returnValue === 'confirm') clearForm();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const allValid = [1, 2, 3, 4].every((step) => validateStep(step));
  if (!allValid) {
    const invalidSection = steps.find((section) => section.querySelector('.invalid'));
    const insuranceMissing = !form.querySelector('input[name="hasInsurance"]:checked');
    const targetStep = insuranceMissing ? 3 : Number(invalidSection?.dataset.step || 1);
    showStep(targetStep);
    validateStep(targetStep);
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Registrando...';
  setTimeout(() => {
    const name = document.getElementById('fullName').value;
    const id = document.getElementById('patientIdDisplay').textContent;
    const age = ageInput.value;
    document.getElementById('successSummary').innerHTML = `
      <strong>${name}</strong><br>
      Identificador: ${id}<br>
      Edad registrada: ${age} años<br>
      Ingreso: ${document.getElementById('entryDate').value} a las ${document.getElementById('entryTime').value}
    `;
    successDialog.showModal();
    submitButton.disabled = false;
    submitButton.textContent = 'Registrar paciente';
    localStorage.removeItem(STORAGE_KEY);
  }, 700);
});

newPatientButton.addEventListener('click', () => {
  successDialog.close();
  clearForm();
});

setAutomaticEntryDateTime();
loadDraft();
updateRepresentativeVisibility();
updateInsuranceVisibility();
showStep(currentStep);
