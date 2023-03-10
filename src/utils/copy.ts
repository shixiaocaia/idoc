import fs from 'fs-extra';

export async function copyFile(from: string, to: string, data: Record<string, string>) {
  let str = await (await fs.readFile(from)).toString();

  Object.keys(data).forEach((key) => {
    str = str.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
  });

  await fs.writeFile(to, str);
}
