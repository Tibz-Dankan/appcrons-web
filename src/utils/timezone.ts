export class Timezone {
  private timeZones: string[];

  constructor(timeZones: string[]) {
    this.timeZones = timeZones;
  }

  // Method to get the current time in the specified time zone
  getCurrentTime(timeZone: string): string {
    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      return formatter.format(new Date());
    } catch (error) {
      console.error("Invalid time zone:", timeZone);
      return "";
    }
  }

  // Method to get the current date in
  //   the specified time zone
  getCurrentDate(timeZone: string): string {
    try {
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };
      const formatter = new Intl.DateTimeFormat([], options);
      return formatter.format(new Date());
    } catch (error) {
      console.error("Invalid time zone:", timeZone);
      return "";
    }
  }

  // Method to get the GMT offset for a given time zone
  private getGMTOffset(timeZone: string): string {
    try {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        timeZoneName: "short",
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const parts = formatter.formatToParts(now);
      const gmtOffset =
        parts.find((part) => part.type === "timeZoneName")?.value || "";
      return gmtOffset;
    } catch (error) {
      console.error("Invalid time zone:", timeZone);
      return "";
    }
  }

  // Method to get the continent from a time zone string
  private getContinent(timeZone: string): string {
    return timeZone.split("/")[0];
  }

  // Method to get the time zone from the array that
  // matches the device's time zone based on continent
  // and GMT offset
  getDeviceTimeZone(): string {
    const deviceTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const deviceContinent = this.getContinent(deviceTimeZone);
    const deviceGMTOffset = this.getGMTOffset(deviceTimeZone);

    for (const timeZone of this.timeZones) {
      if (
        this.getContinent(timeZone) === deviceContinent &&
        this.getGMTOffset(timeZone) === deviceGMTOffset
      ) {
        return timeZone;
      }
    }

    console.warn("Device time zone not found in the provided list.");
    return "";
  }
}
