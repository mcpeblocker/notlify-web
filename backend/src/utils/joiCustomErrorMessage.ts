const joiCustomErrorMessage = (label?: string) => {
    const result = {
      "string.base": `Iltimos, to'g'ri ${label || "{#label}"}ni kiriting.`,
      "string.email": `${label ?? "{#label}"} xato kiritildi`,
      "string.empty": `${label || "{#label}"} maydonini to'ldiring`,
      "string.max": `${label || "{#label}"} ko'pi bilan {#limit}talik bo'lishi kerak.`,
      "string.min": `${label || "{#label}"} kamida {#limit}talik bo'lishi kerak`,
      "string.pattern.base": `${label || "{#label}"} {#value} qiymat bilan bizga mos kelmadi(regex)`,
      "object.unknown": `${label || "{#label}"} ortiqcha`,
      "number.base": `Iltimos, to'g'ri ${label || "{#label}"}ni kiriting.`,
      "number.integer": `Iltimos, ${label || "{#label}"}ga butun son kiriting.`,
      "any.required": `${label || "{#label}"} maydoni to'ldirilishi shart.`,
      "array.base": `${label || "{#label}"}ga to'plam(array) kiriting.`,
      "object.base": `Iltimos, ${label || "{#label}"}ga obyekt kiriting.`,
      "any.unknown": `${label || "{#label}"} maydonining turi noto'g'ri.`,
      "string.regex.base": `${label || "{#label}"}ning formati noto'g'ri.`,
      "any.only": `${
        label || "{#label}"
      } faqat quyidagi qiymatlardan biri bo'lishi mumkin: {#valids}.`,
      "boolean.base": `${
        label || "{#label}"
      } boolean tipda true yoki false bo'lishi kerak.`,
    }
    return result
  };
  
  export default joiCustomErrorMessage;