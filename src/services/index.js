export function validateInput(type, value) {
  switch (type) {
    case "email":
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
        value.length > 255
      ) {
        return { email: true };
      } else {
        return { email: false };
      }
    case "phone":
      if (
        !/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(value) ||
        value.length > 255
      ) {
        return { phone: true };
      } else {
        return { phone: false };
      }
    case "name":
      if (
        !/[a-zA-zА-Яа-я]+\s[a-zA-zА-Яа-я]+/.test(value) ||
        value.length > 255
      ) {
        return { name: true };
      } else {
        return { name: false };
      }
    case "password":
      console.log("validating pass");
      let hasSmallLettExp = /([a-z])+/;
      let hasCapLettExp = /([A-Z])+/;
      let hasDigit = /(\d)+/;
      let specSymbol = /\W/;
      let longEnough = /(.){8,}/;
      let testRes =
        hasSmallLettExp.test(value) &&
        hasCapLettExp.test(value) &&
        hasDigit.test(value) &&
        longEnough.test(value) &&
        specSymbol.test(value);
      if (!testRes) {
        return { password: true };
      } else {
        return { password: false };
      }
    default:
      return false;
  }
}

export async function submitRequest(data, urlType, navFunc) {
  try {
    let requestResult = await fetch(
      `https://lumus.wistis.ru/api/v1/auth/${urlType}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(requestResult);
    let resParsed = await requestResult.json();
    console.log(resParsed);
    if (navFunc) {
      if (resParsed.exists) {
        navFunc("/authorise");
      } else {
        navFunc("/register");
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}
