const IP_URL = "http://144.34.175.242/api/manager_api/";
const IP_URL_FOOD_SHOP = "http://144.34.175.242/api/manager_food_shop_api/";
const IP_URL_FOOD_ITEM = "http://144.34.175.242/api/manager_food_item_api/";

// const IP_URL = "http://localhost:7000/manager_api/";
// const IP_URL_FOOD_SHOP = "http://localhost:7000/manager_food_shop_api/";
// const IP_URL_FOOD_ITEM = "http://localhost:7000/manager_food_item_api/";
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
    UPLOAD_FOOD_ITEM_IMAGE: IP_URL_FOOD_ITEM + "upload_food_item_image"
}

export default MANAGER_SERVICE_PATH;