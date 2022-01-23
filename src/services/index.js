export function validateInput(type, value, setterFunc) {
  switch (type) {
    case "email":
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return { email: true };
      } else {
        return { email: false };
      }

    case "phone":
      if (!/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(value)) {
        return { phone: true };
      } else {
        return { phone: false };
      }

    case "name":
      if (!/[a-zA-zА-Яа-я]+\s[a-zA-zА-Яа-я]+/.test(value)) {
        return { name: true };
      } else {
        return { name: false };
      }

    case "password":
      let hasSmallLettExp = /([a-z])+/;
      let hasCapLettExp = /([A-Z])+/;
      let hasDigit = /(\d)+/;
      let specSymbol = /\W/;
      let longEnough = /(.){6,}/;
      if (
        hasSmallLettExp.test(value) &&
        hasCapLettExp.test(value) &&
        hasDigit.test(value) &&
        longEnough.test(value) &&
        specSymbol.test(value)
      ) {
        return { password: true };
      } else {
        return { password: false };
      }

    default:
      return false;
  }
}

export async function requestAuthorization(value, navFunc) {
  try {
    let requestResult = await fetch("http://localhost:3000/users");
    let resultJson = await requestResult.json();
    if (resultJson.find((item) => item.email === value)) {
      navFunc("/authorise");
    } else {
      navFunc("/register");
    }
  } catch (error) {
    console.log(console.log(error));
  }
}

export async function registerNewUser(data) {
  let newUser = {
    ...data,
  };
  console.log(newUser);
  try {
    let requestResult = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    console.log(requestResult);
  } catch (error) {
    console.log(console.log(error));
  }
}
