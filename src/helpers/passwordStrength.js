const updatePasswordStrength = (val) => {
  document.documentElement.style.setProperty("--password-meter", val);
  const remark = document.querySelector(".password-meter-remark");
  if (val === 0) remark.innerText = "very poor";
  else if (val === 25) remark.innerText = "poor";
  else if (val === 50) remark.innerText = "good";
  else if (val === 75) remark.innerText = "strong";
  else if (val === 100) remark.innerText = "very strong";
};

const checkPasswordStrength = (password, strengths, setStrengths) => {
  const el = document.querySelector('label[for$="password"] span > div');
  const eye = document.querySelector('label[for$="password"] .showPassword');
  if (!password.length) {
    el.style.display = "none";
    eye.style.display = "none";
  } else {
    el.style.display = "block";
    eye.style.display = "flex";
  }
  const meter = Object.keys(strengths).reduce((ttl = 0, strength) => {
    if (
      !strength.achieved &&
      new RegExp(strengths[strength]["pattern"]).test(password)
    ) {
      ttl += 1;
      setStrengths({
        ...strengths,
        [strength]: {
          pattern: strengths[strength].pattern,
          achieved: !strengths[strength].achieved,
        },
      });
    } else if (
      strength.achieved &&
      !new RegExp(strengths[strength]["pattern"]).test(password)
    ) {
      ttl -= 0;
      setStrengths({
        ...strengths,
        [strength]: {
          pattern: strengths[strength].pattern,
          achieved: false,
        },
      });
    }
    return ttl;
  }, 0);
  updatePasswordStrength(meter * 25);
};

export default checkPasswordStrength;
