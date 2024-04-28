const codeOut = document.getElementById("code");

const range = document.getElementById("range");
const checkList = document.querySelector(".generator__lists");
const strenghtValue = document.getElementById("strenght-value");
const strength1 = document.querySelector('[data-strength1="strength1"]');
const strength2 = document.querySelector('[data-strength2="strength2"]');
const strength3 = document.querySelector('[data-strength3="strength3"]');
const strength4 = document.querySelector('[data-strength4="strength4"]');
const buttonGen = document.getElementById("button");
const copyButton = document.getElementById("copy");
const copied = document.getElementById("copied");
const form = document.getElementById("form");



const values = {
  count: 10,
  check1: {
    value: false,
    text: 'Uppercase',
    regex: /[A-Z]/,
    character: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  
  },
  check2: {
    value: false,
    text: 'Lowercase',
    regex: /[a-z]/,
    character: 'abcdefghijklmnopqrstuvwxyz'
  },
  check3: {
    value: false,
    text: 'Numbers',
    regex: /[0-9]/,
    character: '0123456789'
  },
  check4: {
    value: false,
    text: 'Special Characters',
    regex: /[^a-zA-Z0-9]/,
    character: '!@#$%^&*()_+~`|'
  }
}


form.addEventListener('change', (event) => {
  values.count = event.target.value
})

checkList.addEventListener('click', (e) => {
  const check = e.target.closest('input');
  if (check) {
  setValues(check);
  }

})

const setValues = (element) => {
  const id = element.id;
  const checked = element.checked;
  if (checked) {
    values[id].value = true;
    
  } else {
    values[id].value = false;
  }
}

const setTheme = () => {
  const valueLength = Object.values(values).filter(val => val.value).length;

  if (valueLength === 4) {
    strenghtValue.textContent = 'STRONG';
    strength1.className = 'bg-green';
    strength2.className = 'bg-green';
    strength3.className = 'bg-green';
    strength4.className = 'bg-green';
  } else if (valueLength === 3) {
    strenghtValue.textContent = 'MEDIUM';
    strength1.className = 'bg-yellow';
    strength2.className = 'bg-yellow';
    strength3.className = 'bg-yellow';
    strength4.className = '';
  } else if (valueLength === 2) {
    strenghtValue.textContent = 'WEAK';
    strength1.className = 'bg-orange';
    strength2.className = 'bg-orange';
    strength3.className = '';
    strength4.className = '';
  } else if (valueLength === 1) {
    strenghtValue.textContent = 'TOO WEAK!';
    strength1.className = 'bg-red';
    strength2.className = '';
    strength3.className = '';
    strength4.className = '';
  
  } else {
    strenghtValue.textContent = '';
    strength1.className = '';
    strength2.className = '';
    strength3.className = '';
    strength4.className = '';
  }
  
}

function generatePassword() {
  let password = '';
  let characterPools = [];

  for (const check of Object.values(values).filter(v => typeof v === 'object' && v.value)) {
    characterPools.push(check.character);
    password += check.character[Math.floor(Math.random() * check.character.length)];
  }

  if (characterPools.length === 0) {
    return '';
  }

  const allCharacters = characterPools.join('');

  while (password.length < values.count) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  password = password.split('').sort(() => Math.random() - 0.5).join('');
  codeOut.textContent = password;
  
  setTheme()
}

buttonGen.addEventListener('click', () => {
  generatePassword();
  copied.className = 'hidden';

})

copyButton.addEventListener('click', () => {
  if(codeOut.textContent){
    navigator.clipboard.writeText(codeOut.textContent);
    copied.className = '';
  }

})