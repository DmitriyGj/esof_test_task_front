import * as yup from 'yup'
import { parse, isDate } from "date-fns";

export const LoginValidationSchema = yup.object().shape({
    login: yup.string().required('Required'),
    password:yup.string().required('Reqiered')
});

function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
  
    return parsedDate;
}

export const taskValidtaionSchema = yup.object().shape({
    title: yup.string().required('Reqiered'),
    status: yup.string().required('Reqiered'),
    prioryty: yup.string().required('Reqiered'),
    executor_id: yup.string().required('Reqiered'),
    start_date: yup.date().transform(parseDateString),
    end_date:yup.date().transform(parseDateString)
})