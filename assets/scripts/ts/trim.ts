// this function will strip all indentation space on multiline strings
function trimIndentSpaces(stringMsg: string): string {

  // create regex constants (vars)
  const $NEWLINES: RegExp = /(?:\n\r|\n|\r)/;
  const $WHITESPACE: RegExp = /(?:^\s+)/g;

  // Split on newlines.
  var splitRegEx: RegExp = RegExp($NEWLINES);
  let lines: string[] = stringMsg.split(splitRegEx);

  // Rip out the leading whitespace.
  var trimRegEx: RegExp = RegExp($WHITESPACE);
  return lines.map((line) => {
    return line.replace(trimRegEx, '');
  }).join('\n').trim(); // Join back together with new line.
}

/**
 * How to use:
 * ==============
 * // step 1: create multiline string
 * var str: string = `
 * Hello
 * World!
 * `;
 * // step 2: call the trimIndentSpaces function and pass in that string (you could make it a variable if needed)
 * var strTrimmed: string = trimIndentSpaces(str);
 * // step 3: use the trimmed string to your needs
 * alert(strTrimmed);
 * // the following also works:
 * alert(trimIndentSpaces(str));
 */
