const IP_URL = "http://144.34.175.242/api/customer_api/";
const IP_URL_FOOD_SHOP = "http://144.34.175.242/api/customer_food_shop_api/";
const IP_URL_FOOD_ITEM = "http://144.34.175.242/api/customer_food_item_api/";
const IP_URL_DELIVER_DRIVER = "http://144.34.175.242/api/deliver_driver_api/";
const IP_URL_ORDER = "http://144.34.175.242/api/customer_order_api/";
const IP_URL_COMMENT = "http://144.34.175.242/api/customer_comment_api/";
const IP_URL_HELP = "http://144.34.175.242/api/customer_help_api/";

// const IP_URL = "http://localhost:7000/customer_api/";
// const IP_URL_FOOD_SHOP = "http://localhost:7000/customer_food_shop_api/";
// const IP_URL_FOOD_ITEM = "http://localhost:7000/customer_food_item_api/";
// const IP_URL_DELIVER_DRIVER = "http://localhost:7000/deliver_driver_api/";
// const IP_URL_ORDER = "http://localhost:7000/customer_order_api/";
// const IP_URL_COMMENT = "http://localhost:7000/customer_comment_api/";
// const IP_URL_HELP = "http://localhost:7000/customer_help_api/";

const CUSTOMER_SERVICE_PATH = {
    DEFAULT_URL: IP_URL,
    REGISTER_URL: IP_URL + "customer_register/",
    LOGIN_URL: IP_URL + "customer_login/",
    LOGOUT_URL: IP_URL + "customer_logout/",
    RESET_PASSWORD: IP_URL + "customer_password_reset/",
    GET_CUSTOMER_DETAIL: IP_URL + "customer_detail",
    UPDATE_CUSTOMER_PROFILE: IP_URL + "customer_update_profile",
    CUSTOMER_UPLOAD_AVATAR: IP_URL + "customer_upload_avatar",

    RANDOM_FOOD_SHOP_POP_UP: IP_URL_FOOD_SHOP + "get_random_food_shops",
    GET_FAVOURITE_FOOD_SHOPS: IP_URL_FOOD_SHOP + "get_favourite_food_shops",
    GET_FOOD_SHOP_DETAIL: IP_URL_FOOD_SHOP + "get_food_shop_detail",
    GET_FOOD_CATEGORIES: IP_URL_FOOD_SHOP + "get_food_category_by_food_shop_id",
    GET_SEARCH_RESULTS: IP_URL_FOOD_SHOP + "get_search_results",
    UPDATE_FAVOURITE_FOOD_SHOP: IP_URL_FOOD_SHOP + "update_favourite_food_shop",

    GET_FOOD_ITEMS_BY_SHOP_ID: IP_URL_FOOD_ITEM + "get_food_items_by_shop_id",
    GET_FOOD_ITEMS_BY_CATEGORY_ID: IP_URL_FOOD_ITEM + "get_food_items_by_category_id",
    GET_FOOD_ITEM_DETAIL_BY_ID: IP_URL_FOOD_ITEM + "get_food_item_by_id",

    GET_ALL_DRIVER_DETAIL: IP_URL_DELIVER_DRIVER + "get_all_driver_detail",
    GET_QUESTION_ANSWER: IP_URL_HELP + "get_question_answer",

    CREATE_ORDER: IP_URL_ORDER + "create_order",
    GET_CURRENT_ORDERS: IP_URL_ORDER + "get_current_orders",
    GET_ORDER_HISTORY: IP_URL_ORDER + "get_order_history",
    GET_ORDER_DETAIL: IP_URL_ORDER + "get_order_detail_by_order_id",
    ADD_ORDER_TO_DATABASE: IP_URL_ORDER + "add_order_to_database",

    GET_COMMENT_LIST: IP_URL_COMMENT + "get_comment_list_by_item_id",
    GET_COMMENT_DETAIL: IP_URL_COMMENT + "get_comment_detail_by_id",
    ADD_NEW_COMMENT: IP_URL_COMMENT + "add_new_comment",
    EDIT_COMMENT: IP_URL_COMMENT + "edit_comment",
    DELETE_COMMENT: IP_URL_COMMENT + "delete_comment"
};

export default CUSTOMER_SERVICE_PATH;