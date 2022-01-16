import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

export function displayDateTime(date: string): string | undefined {
   const dayjsDate = dayjs(date);

   if (dayjsDate.isValid()) {
      return dayjsDate.format('L LT');
   }
}
