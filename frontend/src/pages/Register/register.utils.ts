// register.utils.ts

/**
 * T.C. Kimlik Numarası doğrulaması yapar.
 *
 * Kurallar:
 * - 11 haneli olmalı.
 * - Sadece rakamlardan oluşmalı.
 * - İlk hane 0 olamaz.
 * - 10. ve 11. haneler T.C. kimlik numarası algoritmasına uymalı.
 */
export const isValidTCKN = (tckn: string): boolean => {
  if (!/^[1-9]\d{10}$/.test(tckn)) {
    return false;
  }

  const digits = tckn.split("").map(Number);

  const oddSum =
    digits[0] + digits[2] + digits[4] + digits[6] + digits[8];

  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

  const tenthDigit = ((oddSum * 7 - evenSum) % 10 + 10) % 10;

  if (tenthDigit !== digits[9]) {
    return false;
  }

  const firstTenSum = digits
    .slice(0, 10)
    .reduce((sum, digit) => sum + digit, 0);

  const eleventhDigit = firstTenSum % 10;

  return eleventhDigit === digits[10];
};