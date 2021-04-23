export default function excludeString(wholeString: string, excludeString: string) {
  const stringArray: string[] =  wholeString.split(excludeString);
  return stringArray.join('');
}