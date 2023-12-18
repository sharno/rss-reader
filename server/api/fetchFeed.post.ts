export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const rawFormData = {
    rssUrl: formData.get("rssUrl") as string,
  };

  let response = await fetch(rawFormData.rssUrl);
  let text = await response.text();
  return text;
});
