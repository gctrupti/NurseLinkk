document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".signup-form");
  const submitBtn = form.querySelector(".btn-signup");
  const loader = submitBtn.querySelector(".btn-loader");
  const passwordToggles = document.querySelectorAll(".password-toggle");

  // ---------------- Password toggle ----------------
  passwordToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (target.type === "password") {
        target.type = "text";
        btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
      } else {
        target.type = "password";
        btn.innerHTML = '<i class="fas fa-eye"></i>';
      }
    });
  });

  // ---------------- Form submission with loader ----------------
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop default submit

    // Show loader
    loader.style.display = "inline-block";
    submitBtn.disabled = true;

    // Optional delay for animation effect
    setTimeout(() => {
      form.submit(); // actually submit the form to Django
    }, 300); // 300ms delay for loader
  });

  // ---------------- Password strength & match ----------------
  const password1 = document.getElementById("id_password1");
  const password2 = document.getElementById("id_password2");
  const strengthFill = document.querySelector(".strength-fill");
  const strengthText = document.querySelector(".strength-text");
  const matchIcon = document.querySelector(".password-match .match-icon");
  const matchText = document.querySelector(".password-match .match-text");

  function updateStrength(pw) {
    let score = 0;
    if (pw.length >= 6) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;

    const percent = (score / 4) * 100;
    strengthFill.style.width = percent + "%";

    if (percent <= 25) strengthText.textContent = "Weak";
    else if (percent <= 50) strengthText.textContent = "Fair";
    else if (percent <= 75) strengthText.textContent = "Good";
    else strengthText.textContent = "Strong";
  }

  password1.addEventListener("input", () => updateStrength(password1.value));

  password2.addEventListener("input", () => {
    if (password2.value === password1.value && password2.value !== "") {
      matchIcon.style.color = "#00a8cc";
      matchText.textContent = "Passwords match";
    } else {
      matchIcon.style.color = "#ff4d4d";
      matchText.textContent = "Passwords do not match";
    }
  });
});
