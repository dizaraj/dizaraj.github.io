$(document).ready(function () {
  $(".navbar-nav>li>a").on("click", function () {
    $(".navbar-collapse").collapse("hide");
  });
});

function sendMail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
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
  }).then((message) => alert("Your mail sent successfully. " + message));
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

  window.onload = function () {
    Particles.init({
      selector: ".background",
    });
  };
  const particles = Particles.init({
    selector: ".background",
    color: ["#03dac6", "#ff0266", "#343a40"],
    connectParticles: true,
    responsive: [
      {
        breakpoint: 768,
        options: {
          color: ["#faebd7", "#03dac6", "#ff0266"],
          maxParticles: 43,
          connectParticles: false,
        },
      },
    ],
  });

// <!--Start of Tawk.to Script-->
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/59369460b3d02e11ecc6873d/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
// <!--End of Tawk.to Script-->