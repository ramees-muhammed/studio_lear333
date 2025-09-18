import localforage from "localforage";

export const cacheImage = async (url: string): Promise<string> => {
  const cached = await localforage.getItem<string>(url);
  if (cached) return cached;

  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onloadend = () => {
      const base64data = reader.result as string;
      localforage.setItem(url, base64data);
      resolve(base64data);
    };
    reader.readAsDataURL(blob);
  });
};
