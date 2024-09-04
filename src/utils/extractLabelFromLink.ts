export const extractLabelFromLink = (link: string) => {
  let label = link.replace(/-/g, " ");

  if (label.toLowerCase().includes("appcrons")) {
    label = label.replace(/appcrons/gi, "Appcrons");
  }

  label = label.charAt(0).toUpperCase() + label.slice(1);

  return label;
};
