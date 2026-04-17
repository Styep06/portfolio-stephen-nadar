document.addEventListener("DOMContentLoaded", () => {
  console.log("JS Loaded");

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  // Safety check
  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading
    status.innerText = "Sending...";
    status.style.color = "yellow";

    const formData = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      // Success
      status.innerText = "✅ Message sent successfully!";
      status.style.color = "lightgreen";

      form.reset();

    } catch (error) {
      console.error("Error:", error);

      // Error
      status.innerText = "❌ Failed to send message. Try again.";
      status.style.color = "red";
    }
  });
});