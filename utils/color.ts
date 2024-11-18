export type ToneColor = "all" | "light" | "dark";
export const color = {
  randomColor: (tone: ToneColor = "all") => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        if (tone === "dark") {
          color += letters[2 + Math.floor(Math.random() * 4)];
        } else if (tone === "light") {
          color += letters[10 + Math.floor(Math.random() * 4)];
        } else {
          color += letters[Math.floor(Math.random() * 16)];
        }
      } else {
        color += letters[Math.floor(Math.random() * 16)];
      }
    }
    return color;
  },
  componentToHex: (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  },
  rgbToHex: (r: number, g: number, b: number) => {
    return (
      "#" +
      color.componentToHex(r) +
      color.componentToHex(g) +
      color.componentToHex(b)
    );
  },
  hexToRgb: (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },
  rgbToHistogram: (r: number, g: number, b: number) => {
    return Math.floor((r + g + b) / 3);
  },
  hexToHistogram: (hex: string) => {
    const rgb = color.hexToRgb(hex);
    return rgb ? Math.floor((rgb.r + rgb.g + rgb.b) / 3) : null;
  },
  rgbIsDark: (r: number, g: number, b: number) => {
    const histogram = color.rgbToHistogram(r, g, b);
    return histogram < 128;
  },
  hexIsDark: (hex: string) => {
    const histogram = color.hexToHistogram(hex);
    return histogram && histogram < 128;
  },
  rgbIsLight: (r: number, g: number, b: number) => {
    return !color.rgbIsDark(r, g, b);
  },
  hexIsLight: (hex: string) => {
    return !color.hexIsDark(hex);
  },
};

export const textColor = (color: string) => {
  switch (color) {
    case "primary-highlight":
    case "green":
    case "gray":
      return `${color}-800`;
    case "secondary":
    case "red":
    case "blue":
    case "orange":
      return `${color}-600`;
    case "gray-light":
      return `gray-200`;
  }
};
