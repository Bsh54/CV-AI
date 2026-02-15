import * as icons from "simple-icons";

export const simpleIconsList = Object.values(icons)
  .filter((icon: any) => icon?.slug)
  .map((icon: any) => ({
    id: icon.slug,
    label: icon.title,
    hex: icon.hex,
  }));
