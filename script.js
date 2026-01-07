//This program will solve all base coversion from base 2 to base 36

// Verification and validaton of digits
function checkdigit(number, base){
  number = number.toLowerCase();
  const spliter = number.split(".") // Splits the number into two parts
  

  if(spliter.length > 2){
    return false
  }
  
  for (let part of spliter){
    for(let dig of part){
      let digit = parseInt(dig, 36); //This will convert letters from A-Z to 10-35
      if(isNaN(digit) || digit >= base){
      return false;}
    }
  }
  return true
}

//Conversion to Denary (Base 10)
const toDenary = (number, base)=>{
  number = number.toLowerCase() 
  const[intpart, fractpart = ''] = number.split(".") //The number will return to parts named intpart and fractpart when the control sees '.' in the inputed number. Else, it will return the number.
  let denaryValue = 0 
  
  //Integer Part of the number
  for(let i = intpart.length - 1; i >= 0; i--){
    const digit = parseInt(intpart[i], 36) // this will also change all the alphabets in the integer part to number 
    const index1 = intpart.length - 1 - i;
    denaryValue +=  digit * Math.pow(base, index1);
  }

  //Fractional Part of the number
  for(let i = 0; i < fractpart.length; i++){
    const digit = parseInt(fractpart[i], 36);// this will also change all the alphabets in the fractional part to number 
    const index2 = -i - 1;
    denaryValue += digit * Math.pow(base, index2)
  }

  return denaryValue;
}

//From Denary(Base 10) to any base
const fromDecimal = (denary, base, precision = 10 )=>{
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //Integer Part
  let integer = Math.floor(denary);
  let fraction = denary - integer;
  let result = '';

  //convert Integer Part
  do{
    result = digits[integer % base ] + result ;
    integer = Math.floor(integer / base);
  }
  while(integer > 0);


  //Convert Fraction Part
  if(fraction > 0){
    result += '.'
    for(let i = 0; i < precision && fraction > 0; i++){
      fraction *= base;
      const digit = Math.floor(fraction);
      result += digits[digit];
      fraction -= digit;
    }
  }
  return result
}



function converter(){
  const num = document.getElementById("number").value.trim();
  const fromBase =parseInt(document.getElementById("fromBase").value);
  const toBase = parseInt(document.getElementById('toBase').value);
  const result = document.querySelector(".result");

  if(!num || isNaN(fromBase) || isNaN(toBase)){
    result.innerHTML = 'please fill all the field';
    return ;
  }

  else if(fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36){
    result.innerHTML = '      base 2 to base 36 is allowed';
  }

  else if(!checkdigit(num, fromBase)){
    result.innerHTML = `Invalid digits for base ${fromBase}`;
    return;
  }

  const denaryValue = toDenary(num, fromBase)
  
  result.innerHTML = fromDecimal(denaryValue, toBase);

}

let clearAll = ()=>{
  document.querySelector('#number').value = '';
  document.querySelector('#fromBase').value = '';
  document.querySelector('#toBase').value = '';
  document.querySelector('.result').innerHTML = '';

}