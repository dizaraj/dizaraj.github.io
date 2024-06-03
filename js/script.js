$(document).ready(function () {
  $(".navbar-nav>li>a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });
});

function sendMail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value;

  let emailBody = `
  <b> Name: </> <p>${name}</p>
  <b> Email: </> <p>${email}</p>
  <p>${message}</p>
  `;



  Email.send({
    SecureToken: "16f9b16c-c436-4036-9abb-06debe394e02",
    To: "dizaraj@gmail.com",
    From: "dizaraj@gmail.com",
    Subject: "Email from Portfolio Site",
    Body: emailBody,
  }).then((message) => alert("Your mail sent successfully. "+message));
}

var app = document.getElementById("typewrittter");

var typewriter = new Typewriter(app, {
  loop: true,
  delay: 75,
});

typewriter
  .typeString("Web Developer")
  .pauseFor(300)
  .deleteChars(13)
  .typeString("Front End Developer")
  .pauseFor(300)
  .deleteChars(19)
  .typeString('<span style="color: #27ae60;">WordPress</span> Developer')
  .pauseFor(1000)
  .start();
