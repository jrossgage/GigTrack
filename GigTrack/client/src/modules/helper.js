import * as moment from 'moment';
import { formatPhoneNumber } from 'react-phone-number-input';
import { isPossiblePhoneNumber } from 'react-phone-number-input'

export const dateFixer = (object) => {
    const date = new Date(object.date);
    let cutDate = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()
    return cutDate
};
export const altDateFixer = (object) => {
    const date = new Date(object.date);
    let cutDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    return cutDate
};
export const momentDateFixer = (object) => {
    const date = new Date(object.date);
    const cutDate = moment(date).format("YYYY-MM-DD")
    return cutDate
};