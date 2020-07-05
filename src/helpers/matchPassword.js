export const matchPassword = (password, confirmPassword) => {
  const el = document.querySelector(".confirm-password-state");
  if (!confirmPassword.length || !password.length) {
    el.style.display = "none";
    return;
  } else {
    el.style.display = "flex";
  }
  const icon = el.querySelector("i");
  if (password === confirmPassword) {
    icon.classList.remove("fa-times-circle");
    icon.classList.add("fa-check-circle");
  } else {
    icon.classList.remove("fa-check-circle");
    icon.classList.add("fa-times-circle");
  }
};
