export function validateField(input) {
  const field = input.closest(".field");

  if (input.type === "checkbox") {
    return input.checkValidity();
  }

  const valid = input.checkValidity();
  const hasValue = input.value.trim() !== "";

  if (field) {
    field.classList.toggle("is-valid", valid && hasValue);
    field.classList.toggle("is-invalid", !valid);

    const message = field.querySelector(".field-message");
    if (message) {
      if (valid && hasValue) {
        message.textContent = "Campo preenchido corretamente.";
      } else if (input.validity.valueMissing) {
        message.textContent = "Este campo é obrigatório.";
      } else if (input.validity.typeMismatch) {
        message.textContent = "Informe um valor no formato correto.";
      } else if (input.validity.tooShort) {
        message.textContent = `Digite pelo menos ${input.minLength} caracteres.`;
      } else if (input.validity.patternMismatch) {
        message.textContent = "Confira o formato informado.";
      } else if (input.validity.rangeUnderflow) {
        message.textContent = `O valor mínimo permitido é ${input.min}.`;
      } else if (input.validity.rangeOverflow) {
        message.textContent = `O valor máximo permitido é ${input.max}.`;
      }
    }
  }

  return valid;
}

export function validateForm(form) {
  const required = [...form.querySelectorAll("input[required], select[required], textarea[required]")];
  return required.every(validateField);
}

export function bindRealtimeValidation(form) {
  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("blur", () => validateField(input));

    input.addEventListener("input", () => {
      const field = input.closest(".field");
      if (field?.classList.contains("is-invalid")) {
        validateField(input);
      }
    });
  });
}

export function clearValidation(form) {
  form.querySelectorAll(".field").forEach(field => {
    field.classList.remove("is-valid", "is-invalid");
  });
}