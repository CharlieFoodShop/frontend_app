// const IP_URL = "http://144.34.175.242/api/manager_api/";
// const IP_URL_FOOD_SHOP = "http://144.34.175.242/api/manager_food_shop_api/";

const IP_URL = "http://localhost:7000/manager_api/";
const IP_URL_FOOD_SHOP = "http://localhost:7000/manager_food_shop_api/";
const MANAGER_SERVICE_PATH = {
    DEFAULT_URL: IP_URL,
    REGISTER_URL: IP_URL + "manager_register/",
    LOGIN_URL: IP_URL + "manager_login/",
    LOGOUT_URL: IP_URL + "manager_logout/",
    RESET_PASSWORD: IP_URL + "manager_password_reset/",
    GET_MANAGER_DETAIL: IP_URL + "manager_detail",

    ADD_FOOD_SHOP_URL: IP_URL_FOOD_SHOP + "add_food_shop",
    GET_FOOD_SHOP_LIST: IP_URL_FOOD_SHOP + "get_food_shops_by_manager",
    GET_FOOD_SHOP_CATEGORY_LIST: IP_URL_FOOD_SHOP + "get_all_food_shop_category",
    UPLOAD_FOOD_SHOP_IMAGE: IP_URL_FOOD_SHOP + "upload_food_shop_image"
}

export default MANAGER_SERVICE_PATH;