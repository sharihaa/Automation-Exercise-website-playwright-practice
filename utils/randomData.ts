export function generateUniqueEmail(): string {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `sqa.user.${timestamp}.${randomNumber}@example.com`;
}

export function generateUniqueSubject(): string {
  return `Automation Test Subject ${Date.now()}`;
}
