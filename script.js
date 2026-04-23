document.addEventListener("DOMContentLoaded", () => {
  console.log("JS Loaded");

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.innerText = "Sending...";
    status.style.color = "yellow";

    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    try {
      const response = await fetch(
        "https://portfolio-stephen-nadar.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      status.innerText = "✅ Message sent successfully!";
      status.style.color = "lightgreen";

      form.reset();

    } catch (error) {
      console.error("Error:", error);

      status.innerText = "❌ Failed to send message. Try again.";
      status.style.color = "red";
    }
  });
});