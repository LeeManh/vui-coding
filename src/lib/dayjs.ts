import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

import "dayjs/locale/en";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default dayjs;
