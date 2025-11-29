import { GET_CATEGORY_LIST} from "../../constant";

export function getCategoryList(data) {
    return {
        type: GET_CATEGORY_LIST,
        data
    };
}
