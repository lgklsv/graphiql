/** remove the extra characters to send the line to the click */
export const removeCharacters = (input: string) => {
  const forbiddenChars = [']', '[', '!'];

  forbiddenChars.forEach((char) => {
    input = input.split(char).join('');
  });

  return input;
};
