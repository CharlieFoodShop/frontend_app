const IP_URL = "http://144.34.175.242/api/manager_api/";
const IP_URL_FOOD_SHOP = "http://144.34.175.242/api/manager_food_shop_api/";
const IP_URL_FOOD_ITEM = "http://144.34.175.242/api/manager_food_item_api/";
const IP_URL_ORDER = "http://144.34.175.242/api/manager_order_api/";
const IP_URL_COMMENT = "http://144.34.175.242/api/manager_comment_api/";
const IP_URL_REPORT = "http://144.34.175.242/api/manager_report_api/";

// const IP_URL = "http://localhost:7000/manager_api/";
// const IP_URL_FOOD_SHOP = "http://localhost:7000/manager_food_shop_api/";
// const IP_URL_FOOD_ITEM = "http://localhost:7000/manager_food_item_api/";
// const IP_URL_ORDER = "http://localhost:7000/manager_order_api/";
// const IP_URL_COMMENT = "http://localhost:7000/manager_comment_api/";
// const IP_URL_REPORT = "http://localhost:7000/manager_report_api/";

const MANAGER_SERVICE_PATH = {
    DEFAULT_URL: IP_URL,
    REGISTER_URL: IP_URL + "manager_register/",
    LOGIN_URL: IP_URL + "manager_login/",
    LOGOUT_URL: IP_URL + "manager_logout/",
    RESET_PASSWORD: IP_URL + "manager_password_reset/",
    GET_MANAGER_DETAIL: IP_URL + "manager_detail",
    UPDATE_MANAGER_ACCOUNT: IP_URL + "manager_update_account",
    UPDATE_MANAGER_PROFILE: IP_URL + "manager_update_profile",
    MANAGER_UPLOAD_AVATAR: IP_URL + "manager_upload_avatar",

    ADD_FOOD_SHOP_URL: IP_URL_FOOD_SHOP + "add_food_shop",
    ADD_FOOD_CATEGORY: IP_URL_FOOD_SHOP + "add_food_category",
    GET_FOOD_SHOP_LIST: IP_URL_FOOD_SHOP + "get_food_shops_by_manager",
    GET_FOOD_SHOP_DETAIL: IP_URL_FOOD_SHOP + "get_food_shops_by_food_shop",
    GET_FOOD_SHOP_CATEGORY_LIST: IP_URL_FOOD_SHOP + "get_all_food_shop_category",
    GET_ALL_MATCH_FOOD_CATEGORY: IP_URL_FOOD_SHOP + "get_match_food_category",
    UPDATE_FOOD_SHOP_ACTIVE: IP_URL_FOOD_SHOP + "update_food_shop_active",
    UPDATE_FOOD_SHOP: IP_URL_FOOD_SHOP + "update_food_shop",
    UPLOAD_FOOD_SHOP_IMAGE: IP_URL_FOOD_SHOP + "upload_food_shop_image",

    ADD_FOOD_ITEM_URL: IP_URL_FOOD_ITEM + "add_food_item",
    GET_FOOD_ITEM_LIST: IP_URL_FOOD_ITEM + "get_all_food_item_by_category",
    GET_FOOD_ITEM_CATEGORY_LIST: IP_URL_FOOD_SHOP + "get_food_category_by_food_shop",
    GET_FOOD_ITEM_DETAIL: IP_URL_FOOD_ITEM + "get_food_item_by_food_item_id",
    UPDATE_FOOD_ITEM: IP_URL_FOOD_ITEM + "update_food_item",
    UPLOAD_FOOD_ITEM_IMAGE: IP_URL_FOOD_ITEM + "upload_food_item_image",

    GET_CURRENT_ORDERS: IP_URL_ORDER + "get_current_orders",
    GET_ORDER_HISTORY: IP_URL_ORDER + "get_order_history",
    GET_ORDER_DETAIL: IP_URL_ORDER + "get_order_detail",
    COMPLETE_ORDER: IP_URL_ORDER + "complete_order",

    GET_COMMENT_LIST: IP_URL_COMMENT + "get_comment_list_by_item_id",

    GET_REPORT_INITIAL_STATE: IP_URL_REPORT + "get_initial_state",
    GET_SALES_BY_TIME_PERIOD: IP_URL_REPORT + "get_sales_by_time_period",
    GET_SALES_BY_REGION: IP_URL_REPORT + "get_sales_by_region",
    GET_SALES_BY_USER_ID: IP_URL_REPORT + "get_sales_by_user_id"
}

export default MANAGER_SERVICE_PATH;