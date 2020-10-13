import { GET_STUDENTS_BY_GROUP, ADD_STUDENT_TO_GROUP } from '../consts/actionTypes.js';

const initialState = []

export default function student(state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS_BY_GROUP:
            return {
                ...state,
                data: action.payload
            }
        case ADD_STUDENT_TO_GROUP:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}