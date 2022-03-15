const moment = require("moment");
const validationResponse = require("../dtos/validationResponse");
const validateDate = (start_date, end_date , target_date)=>{

    const today = moment();


    // check if all dates are valid
    if(!start_date.isValid())
        return validationResponse(false, "Invalid Start date");

    if(!end_date.isValid())
        return validationResponse(false,"Invalid end date")

    if(!target_date.isValid())
        return validationResponse(false, "Invalid target date");


    // Impose rules on when the poll should be opened
    if(start_date.isBefore(today) || end_date.isBefore(today) || target_date.isBefore(today))
        return validationResponse(false, "All dates should be in the future");

    if(start_date.isAfter(end_date) || start_date.isAfter(target_date))
        return validationResponse(false, "Start date should be before poll expiry date and poll target date")

    if(start_date.add(process.env.MIN_GAP_BETWEEN_START_AND_END_DATES, 'hours').isAfter(end_date))
        return validationResponse(false, `There should be at least ${process.env.MIN_GAP_BETWEEN_END_AND_TARGET_DATES} hours time for students to vote`)

    if(end_date.isAfter(target_date)) return validationResponse(false, `Poll end date should be at last ${process.env.MIN_GAP_BETWEEN_END_AND_TARGET_DATES}  days a head of target date`)

    return validationResponse(true);
}

module.exports = {validateDate}
