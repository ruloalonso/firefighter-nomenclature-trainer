// --- BASE DE DATOS (del PDF) ---

const parques = {
  11: { name: "Alcobendas" },
  12: { name: "Tres Cantos" },
  13: { name: "Lozoyuela" },
  21: { name: "Coslada" },
  22: { name: "Alcalá" },
  23: { name: "Arganda del Rey", nick: "Arganda" },
  26: { name: "Torrejón" },
  30: { name: "Fuenlabrada" },
  31: { name: "Parla" },
  32: { name: "Villaviciosa de Odón", nick: "Villa" },
  33: { name: "Aranjuez" },
  34: { name: "Aldea del Freso", nick: "Aldea" },
  35: { name: "San Martín de Valdeiglesias", nick: "San Martín" },
  36: { name: "Getafe" },
  37: { name: "Valdemoro" },
  38: { name: "Móstoles" },
  39: { name: "Leganés" },
  41: { name: "Las Rozas" },
  42: { name: "Collado Villalba", nick: "Villalba" },
  43: { name: "El Escorial" },
  46: { name: "Navacerrada" },
  47: { name: "Pozuelo" },
};

const vehiculos = {
  ".11": "Bomba Rural Pesada", // Se tratará como "Primera"
  ".12": "Bomba Rural Pesada", // Se tratará como "Segunda"
  ".21": "Bomba Forestal Pesada",
  ".30": "Autoescala",
  ".31": "Furgón Salvamentos Varios",
  ".32": "Bomba Nodriza Pesada", // Abreviado como "Nodriza"
  ".33": "Vehículo de Iluminación y Achique",
  ".34": "Furgón Apeos Varios",
  ".35": "Furgón Reserva de Aire", // Abreviado como "FRA"
  ".36": "Vehículo de Defensa Radiológica, Biológica y Química", // Abreviado como "RBQ"
  ".37": "Vehículo de Asistencias Técnicas",
  ".38": "Furgón Equipo Rescate", // Abreviado como "FER"
  ".39": "Vehículo Rescate Acuático",
  ".25": "Punto Incendio Forestal", // Abreviado como "PIF"
  ".15": "Punto de Incendio Rural", // Abreviado como "PIR"
  ".40": "Unidad Transporte de Personal", // Abreviado como "BUS"
};

const jefaturas = {
  "J2.1": "Oficial de Guardia de Las Rozas / Jefe de Operaciones de Las Rozas",
  "J2.2": "Oficial de Guardia de Coslada / Jefe de Operaciones de Coslada",
  "J3.1": "Jefe Supervisor de Alcobendas",
  "J3.2": "Jefe Supervisor de Coslada",
  "J3.3": "Jefe Supervisor de Parla",
  "J3.4": "Jefe Supervisor de Las Rozas",
  "J3.5": "Jefe Supervisor de Fuenlabrada",
  JLO: "Jefe Logista",
};

// Frases adaptadas de los ejemplos del PDF
const claves = {
  C0: "está inoperativo",
  C2: "sale a intervención",
  C3: "ha llegado a la intervención",
  C4: "da intervención controlada",
  C5: "se va del siniestro",
  C6: "ha llegado a parque",
};

// --- REFERENCIAS AL DOM ---

const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const checkButton = document.getElementById("check-button");
const nextButton = document.getElementById("next-button");
const feedbackText = document.getElementById("feedback-text");

let currentCorrectAnswer = "";

// --- FUNCIONES AUXILIARES ---

function getRandomKey(obj) {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
}

// Devuelve el nombre del parque, usando el apodo a veces
function getParqueName(parque) {
  return parque.nick && Math.random() > 0.4 ? parque.nick : parque.name;
}

// Devuelve el nombre del vehículo, con lógica especial
function getVehiculoName(vKey, vName) {
  if (vKey === ".11") return "Bomba Rural Pesada";
  if (vKey === ".12") return "Segunda Bomba Rural Pesada";
  if (vKey === ".32")
    return Math.random() > 0.5 ? "Bomba Nodriza Pesada" : "Nodriza";
  if (vKey === ".31") return "FSV";
  if (vKey === ".35") return "FRA";
  if (vKey === ".25") return "PIF";
  if (vKey === ".15") return "PIR";
  if (vKey === ".38") return "FER";
  if (vKey === ".36") return "RBQ";
  if (vKey === ".40") return "BUS";
  return vName;
  º;
}

// Devuelve el nombre de la jefatura, eligiendo uno si hay '/'
function getJefaturaName(jName) {
  if (jName.includes(" / ")) {
    const names = jName.split(" / ");
    return names[Math.floor(Math.random() * names.length)];
  }
  return jName;
}

// --- LÓGICA PRINCIPAL ---

function generateQuestion() {
  const type = Math.floor(Math.random() * 5) + 1; // Genera un tipo de 1 a 5
  let question = "";
  let answer = "";

  // Resetea el estado
  feedbackText.textContent = "";
  feedbackText.className = "";
  answerInput.value = "";
  checkButton.classList.remove("hidden");
  nextButton.classList.add("hidden");

  // Variables comunes
  let pKey, pName, vKey, vName, jKey, jName, cKey, cName;

  switch (type) {
    case 1: // Parque + Vehículo
      pKey = getRandomKey(parques);
      pName = getParqueName(parques[pKey]);
      vKey = getRandomKey(vehiculos);
      vName = getVehiculoName(vKey, vehiculos[vKey]);

      question = `${vName} de ${pName}`;
      answer = `${pKey}${vKey}`;
      break;

    case 2: // Jefatura
      jKey = getRandomKey(jefaturas);
      jName = getJefaturaName(jefaturas[jKey]);

      question = jName;
      answer = jKey;
      break;

    case 3: // Parque + Vehículo + Clave
      pKey = getRandomKey(parques);
      pName = getParqueName(parques[pKey]);
      vKey = getRandomKey(vehiculos);
      vName = getVehiculoName(vKey, vehiculos[vKey]);
      cKey = getRandomKey(claves);
      cName = claves[cKey];

      question = `${vName} de ${pName} ${cName}`;
      answer = `${pKey}${vKey} en ${cKey}`;
      break;

    case 4: // Jefatura + Clave
      jKey = getRandomKey(jefaturas);
      jName = getJefaturaName(jefaturas[jKey]);
      cKey = getRandomKey(claves);
      cName = claves[cKey];

      question = `${jName} ${cName}`;
      answer = `${jKey} en ${cKey}`;
      break;

    case 5: // Jefatura + Parque/Vehículo + Clave
      jKey = getRandomKey(jefaturas);
      jName = getJefaturaName(jefaturas[jKey]);

      pKey = getRandomKey(parques);
      pName = getParqueName(parques[pKey]);
      vKey = getRandomKey(vehiculos);
      vName = getVehiculoName(vKey, vehiculos[vKey]);

      cKey = getRandomKey(claves);
      cName = claves[cKey];

      question = `${jName} y ${vName} de ${pName} ${cName}`;
      answer = `${jKey} y ${pKey}${vKey} en ${cKey}`;
      break;
  }

  // Capitaliza la primera letra de la pregunta
  question = question.charAt(0).toUpperCase() + question.slice(1);

  questionText.textContent = question;
  currentCorrectAnswer = answer;
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim();
  if (userAnswer.length === 0) return;

  // Comparación simple e insensible a mayúsculas
  if (userAnswer.toLowerCase() === currentCorrectAnswer.toLowerCase()) {
    feedbackText.textContent = "¡Correcto!";
    feedbackText.className = "correct";
  } else {
    feedbackText.textContent = `Incorrecto. Era: ${currentCorrectAnswer}`;
    feedbackText.className = "incorrect";
  }

  checkButton.classList.add("hidden");
  nextButton.classList.remove("hidden");
  answerInput.focus();
}

function nextQuestion() {
  generateQuestion();
  answerInput.focus();
}

// --- EVENT LISTENERS ---

// Cargar la primera pregunta al iniciar
document.addEventListener("DOMContentLoaded", nextQuestion);

// Comprobar con el botón
checkButton.addEventListener("click", checkAnswer);

// Siguiente con el botón
nextButton.addEventListener("click", nextQuestion);

// Permitir usar "Enter" para comprobar
answerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Si el botón de comprobar está visible, comprueba.
    // Si no, pasa a la siguiente pregunta.
    if (!checkButton.classList.contains("hidden")) {
      checkAnswer();
    } else {
      nextQuestion();
    }
  }
});
