export const removeForbiddenCharacters = (input: string) => {
  const forbiddenChars = [']', '[', '!'];

  forbiddenChars.forEach((char) => {
    input = input.split(char).join('');
  });

  return input;
};
