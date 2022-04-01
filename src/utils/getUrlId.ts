export function getUrlId(url: string) {
  const splitedUrl = url.split('/');
  const characterId = splitedUrl[splitedUrl.length - 2];

  return characterId;
}
