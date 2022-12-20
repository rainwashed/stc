import demographic from "./demographic.api";
import contacts from "./contacts.api";
import schedule from "./schedule.api";
import enrollment from "./enrollment.api";
import health from "./health.api";
import attendance from "./attendance.api";
import cafeteria from "./cafeteria.api";
import activities from "./activities.api";
import gpa from "./gpa.api";
import assignments from "./assignments.api";
import pulse from "./pulse.api";
import standards from "./standards.api";
import marks from "./marks.api";
import report_cards from "./report_cards.api";
import transcript from "./transcript.api";

/*
    - News
    - District Notices
    - Advisory Schedule

    All missing but not yet necessary
*/

export const routes = {
    demographic,
    contacts,
    schedule,
    enrollment,
    health,
    attendance,
    cafeteria,
    activities,
    gpa,
    assignments,
    pulse,
    standards,
    marks,
    report_cards,
};
